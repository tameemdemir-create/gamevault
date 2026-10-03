const { createHash, randomUUID } = require("node:crypto");
const { getDatabase } = require("firebase-admin/database");
const { initializeApp } = require("firebase-admin/app");
const { TranslationServiceClient } = require("@google-cloud/translate").v3;
const { HttpsError, onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

initializeApp();

const paypalClientId = defineSecret("PAYPAL_CLIENT_ID");
const paypalClientSecret = defineSecret("PAYPAL_CLIENT_SECRET");
const paypalApiBase = "https://api-m.sandbox.paypal.com";
const storeUrl = "https://tameemdemir-create.github.io/gamevault/";
const paypalCurrencies = new Set([
    "AUD", "BRL", "CAD", "CNY", "CZK", "DKK", "EUR", "HKD", "HUF", "ILS", "JPY",
    "MYR", "MXN", "NZD", "NOK", "PHP", "PLN", "GBP", "RUB", "SGD", "SEK", "CHF",
    "THB", "TWD", "USD"
]);
const zeroDecimalCurrencies = new Set(["HUF", "JPY"]);

const translator = new TranslationServiceClient();
const supportedLanguages = new Set([
    "ar", "en", "zh-CN", "es", "hi", "fr", "pt", "ru", "de", "id", "ja", "ko", "ur"
]);
const allowedFields = new Set(["name", "quantity", "description"]);
const maximumFieldLength = 4000;
const maximumRequestCharacters = 20000;
const dailyCharacterLimit = 20000;

exports.translateProduct = onCall({ region: "us-central1", maxInstances: 2 }, async request => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "Sign in to translate products.");
    }

    const sourceInput = request.data?.sourceFields;
    const targetInput = request.data?.targetFields;
    if (!sourceInput || typeof sourceInput !== "object" || Array.isArray(sourceInput) ||
        !targetInput || typeof targetInput !== "object" || Array.isArray(targetInput)) {
        throw new HttpsError("invalid-argument", "Product fields and target languages are required.");
    }

    const sourceFields = {};
    for (const field of allowedFields) {
        const value = sourceInput[field];
        if (typeof value !== "string" || !value.trim()) continue;
        sourceFields[field] = value.trim();
        if (sourceFields[field].length > maximumFieldLength) {
            throw new HttpsError("invalid-argument", "A product field is too long to translate.");
        }
    }

    const targets = Object.entries(targetInput);
    if (targets.length > supportedLanguages.size - 1) {
        throw new HttpsError("invalid-argument", "Too many target languages.");
    }

    const normalizedTargets = {};
    for (const [locale, fields] of targets) {
        if (!supportedLanguages.has(locale) || locale === "ar" || !Array.isArray(fields) || fields.length > allowedFields.size) {
            throw new HttpsError("invalid-argument", "An unsupported target language was requested.");
        }
        const uniqueFields = [...new Set(fields)];
        if (uniqueFields.some(field => !allowedFields.has(field) || !sourceFields[field])) {
            throw new HttpsError("invalid-argument", "A requested translation field is invalid.");
        }
        if (uniqueFields.length) normalizedTargets[locale] = uniqueFields;
    }

    const targetLanguages = Object.keys(normalizedTargets);
    if (!targetLanguages.length) return { translations: {} };

    const requestCharacters = targetLanguages.reduce((total, locale) =>
        total + normalizedTargets[locale].reduce((localeTotal, field) => localeTotal + sourceFields[field].length, 0), 0);
    if (requestCharacters > maximumRequestCharacters) {
        throw new HttpsError("resource-exhausted", "This product contains too much text to translate at once.");
    }

    const userHash = createHash("sha256").update(request.auth.uid).digest("hex");
    const dateKey = new Date().toISOString().slice(0, 10);
    const usageRef = getDatabase().ref(`_translationUsage/${userHash}/${dateKey}`);
    const usage = await usageRef.transaction(current => {
        const next = (Number(current) || 0) + requestCharacters;
        return next > dailyCharacterLimit ? undefined : next;
    });
    if (!usage.committed) {
        throw new HttpsError("resource-exhausted", "The daily product translation limit has been reached.");
    }

    const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT;
    if (!projectId) {
        throw new HttpsError("failed-precondition", "The Google Cloud project is not configured.");
    }

    try {
        const translations = await Promise.all(targetLanguages.map(async locale => {
            const fields = normalizedTargets[locale];
            const [response] = await translator.translateText({
                parent: `projects/${projectId}/locations/global`,
                contents: fields.map(field => sourceFields[field]),
                mimeType: "text/plain",
                sourceLanguageCode: "ar",
                targetLanguageCode: locale
            });
            const localeTranslations = {};
            fields.forEach((field, index) => {
                const translatedText = response.translations?.[index]?.translatedText;
                if (!translatedText) throw new Error(`No translation returned for ${locale}:${field}`);
                localeTranslations[field] = translatedText;
            });
            return [locale, localeTranslations];
        }));

        return { translations: Object.fromEntries(translations) };
    } catch (error) {
        console.error("Google Cloud product translation failed", error);
        throw new HttpsError("unavailable", "Google Cloud Translation could not translate this product.");
    }
});

async function getPayPalAccessToken() {
    const credentials = Buffer.from(`${paypalClientId.value()}:${paypalClientSecret.value()}`).toString("base64");
    const response = await fetch(`${paypalApiBase}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.access_token) {
        console.error("PayPal OAuth failed", response.status, result.error);
        throw new HttpsError("unavailable", "PayPal is not configured correctly.");
    }
    return result.access_token;
}

async function paypalRequest(accessToken, path, { method = "GET", body, requestId } = {}) {
    const headers = { Authorization: `Bearer ${accessToken}` };
    if (body) headers["Content-Type"] = "application/json";
    if (requestId) headers["PayPal-Request-Id"] = requestId;

    const response = await fetch(`${paypalApiBase}${path}`, {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {})
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        console.error("PayPal API request failed", response.status, result.name);
        throw new HttpsError("unavailable", "PayPal could not process this request.");
    }
    return result;
}

function findProduct(products, productId) {
    const entries = Array.isArray(products)
        ? products.map((product, index) => [String(index), product])
        : Object.entries(products || {});
    return entries.find(([, product]) => String(product?.id) === productId);
}

async function changeProductStock(productId, decrement, orderKey) {
    const productsRef = getDatabase().ref("products");
    return productsRef.transaction(products => {
        const entries = Array.isArray(products)
            ? products.map((product, index) => [String(index), product])
            : Object.entries(products || {});
        const entry = entries.find(([, product]) => String(product?.id) === productId);
        if (!entry) return;

        const [key, product] = entry;
        const stock = product.stock;
        if (stock === null || stock === undefined || stock === "") return products;
        if (product.paypalSales?.[orderKey]) return products;
        const available = Number(stock);
        if (!Number.isInteger(available) || available < 0 || (decrement && available < 1)) return;

        const updatedProduct = {
            ...product,
            stock: available - (decrement ? 1 : 0),
            ...(decrement ? { paypalSales: { ...(product.paypalSales || {}), [orderKey]: true } } : {})
        };
        if (Array.isArray(products)) {
            const updated = [...products];
            updated[Number(key)] = updatedProduct;
            return updated;
        }
        return { ...products, [key]: updatedProduct };
    });
}

exports.createPayPalOrder = onCall({
    region: "us-central1",
    maxInstances: 2,
    secrets: [paypalClientId, paypalClientSecret]
}, async request => {
    const productId = String(request.data?.productId || "").trim();
    const buyerEmail = String(request.data?.buyerEmail || "").trim().toLowerCase();
    const playerId = String(request.data?.playerId || "").trim();
    if (!productId || productId.length > 128 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)) {
        throw new HttpsError("invalid-argument", "A product and valid buyer email are required.");
    }

    const productEntry = findProduct((await getDatabase().ref("products").once("value")).val(), productId);
    const product = productEntry?.[1];
    if (!product) throw new HttpsError("not-found", "This product is no longer available.");

    const price = Number(product.price);
    const currency = String(product.currency || "").toUpperCase();
    if (!Number.isFinite(price) || price <= 0) {
        throw new HttpsError("failed-precondition", "This product has an invalid price.");
    }
    if (!paypalCurrencies.has(currency)) {
        throw new HttpsError("failed-precondition", `PayPal does not support ${currency || "this currency"}. Set this product to a supported currency such as USD.`);
    }
    if (zeroDecimalCurrencies.has(currency) && !Number.isInteger(price)) {
        throw new HttpsError("failed-precondition", `${currency} prices cannot include decimals.`);
    }

    const needsPlayerId = product.type === "UC" || product.type === "Royale Pass";
    if (needsPlayerId && !/^\d{5,20}$/.test(playerId)) {
        throw new HttpsError("invalid-argument", "Enter a valid PUBG player ID.");
    }

    const stock = product.stock;
    if (stock !== null && stock !== undefined && stock !== "" && (!Number.isInteger(Number(stock)) || Number(stock) < 1)) {
        throw new HttpsError("failed-precondition", "This product is out of stock.");
    }

    const orderKey = randomUUID();
    const accessToken = await getPayPalAccessToken();
    const paypalOrder = await paypalRequest(accessToken, "/v2/checkout/orders", {
        method: "POST",
        requestId: orderKey,
        body: {
            intent: "CAPTURE",
            purchase_units: [{
                reference_id: productId,
                custom_id: orderKey,
                description: String(product.name || "GameVault product").slice(0, 127),
                amount: { currency_code: currency, value: price.toFixed(zeroDecimalCurrencies.has(currency) ? 0 : 2) }
            }],
            payment_source: {
                paypal: {
                    experience_context: {
                        brand_name: "GameVault",
                        user_action: "PAY_NOW",
                        return_url: `${storeUrl}?paypalOrder=${encodeURIComponent(orderKey)}`,
                        cancel_url: `${storeUrl}?paypalCancelled=1`
                    }
                }
            }
        }
    });

    const approvalUrl = paypalOrder.links?.find(link => link.rel === "approve")?.href;
    if (!paypalOrder.id || !approvalUrl) {
        throw new HttpsError("unavailable", "PayPal did not return a checkout link.");
    }

    await getDatabase().ref(`orders/${orderKey}`).set({
        id: orderKey,
        paypalOrderId: paypalOrder.id,
        productId,
        productName: String(product.name || "").slice(0, 200),
        productType: String(product.type || ""),
        buyerEmail,
        playerId: needsPlayerId ? playerId : "",
        amount: price,
        currency,
        status: "PENDING",
        createdAt: Date.now()
    });

    return { approvalUrl };
});

exports.capturePayPalOrder = onCall({
    region: "us-central1",
    maxInstances: 2,
    secrets: [paypalClientId, paypalClientSecret]
}, async request => {
    const orderKey = String(request.data?.orderKey || "").trim();
    const paypalOrderId = String(request.data?.paypalOrderId || "").trim();
    if (!/^[0-9a-f-]{36}$/i.test(orderKey) || !/^[A-Z0-9-]{10,40}$/i.test(paypalOrderId)) {
        throw new HttpsError("invalid-argument", "The PayPal order reference is invalid.");
    }

    const orderRef = getDatabase().ref(`orders/${orderKey}`);
    const snapshot = await orderRef.once("value");
    const order = snapshot.val();
    if (!order || order.paypalOrderId !== paypalOrderId) {
        throw new HttpsError("not-found", "The order could not be found.");
    }
    if (order.status === "PAID") {
        return { orderId: orderKey, status: order.status, productName: order.productName };
    }
    if (order.status !== "PENDING") {
        throw new HttpsError("failed-precondition", "This order is already being processed or cannot be paid.");
    }

    const lockToken = randomUUID();
    const lock = await orderRef.transaction(current => {
        const canRetry = current?.status === "PROCESSING" && Number(current.lockExpiresAt) < Date.now();
        if (!current || (current.status !== "PENDING" && !canRetry)) return;
        return { ...current, status: "PROCESSING", lockToken, lockExpiresAt: Date.now() + 120000 };
    });
    if (!lock.committed || lock.snapshot.val()?.lockToken !== lockToken) {
        throw new HttpsError("aborted", "This order is already being processed. Try again shortly.");
    }

    const accessToken = await getPayPalAccessToken();
    let capture;
    try {
        const result = await paypalRequest(accessToken, `/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`, {
            method: "POST",
            requestId: paypalOrderId,
            body: {}
        });
        capture = result.purchase_units?.[0]?.payments?.captures?.[0];
        if (result.status !== "COMPLETED" || !capture?.id || capture.amount?.currency_code !== order.currency || Number(capture.amount?.value) !== Number(order.amount)) {
            await orderRef.update({ status: "PAYMENT_REVIEW", lockToken: null, lockExpiresAt: null });
            throw new HttpsError("failed-precondition", "PayPal did not confirm the expected payment amount.");
        }
    } catch (error) {
        if (error instanceof HttpsError) throw error;
        await orderRef.update({ status: "PENDING", lockToken: null, lockExpiresAt: null });
        throw error;
    }

    const stockChange = await changeProductStock(order.productId, true, orderKey);
    if (!stockChange.committed) {
        try {
            const refund = await paypalRequest(accessToken, `/v2/payments/captures/${encodeURIComponent(capture.id)}/refund`, {
                method: "POST",
                requestId: capture.id,
                body: {}
            });
            await orderRef.update({
                status: refund.status === "COMPLETED" ? "REFUNDED" : "REFUND_REVIEW",
                captureId: capture.id,
                refundId: refund.id || null,
                lockToken: null,
                lockExpiresAt: null
            });
        } catch (error) {
            console.error("PayPal refund failed after stock conflict", error.code || error.message);
            await orderRef.update({ status: "REFUND_REVIEW", captureId: capture.id, lockToken: null, lockExpiresAt: null });
        }
        throw new HttpsError("failed-precondition", "The product sold out during checkout. PayPal refund status is recorded for review.");
    }

    await orderRef.update({
        status: "PAID",
        captureId: capture.id,
        paidAt: Date.now(),
        lockToken: null,
        lockExpiresAt: null
    });
    return { orderId: orderKey, status: "PAID", productName: order.productName };
});
