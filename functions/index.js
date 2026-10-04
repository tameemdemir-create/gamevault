const { createHash, timingSafeEqual } = require("node:crypto");
const { getDatabase } = require("firebase-admin/database");
const { initializeApp } = require("firebase-admin/app");
const { TranslationServiceClient } = require("@google-cloud/translate").v3;
const { HttpsError, onCall } = require("firebase-functions/v2/https");

initializeApp();

const translator = new TranslationServiceClient();
const supportedLanguages = new Set([
    "ar", "en", "zh-CN", "es", "hi", "fr", "pt", "ru", "de", "id", "ja", "ko", "ur"
]);
const allowedFields = new Set(["name", "quantity", "description"]);
const maximumFieldLength = 4000;
const maximumRequestCharacters = 20000;
const dailyCharacterLimit = 20000;
const productCodeAttemptLimit = 8;
const productCodeAttemptWindowMs = 10 * 60 * 1000;

exports.verifyProductCode = onCall({ region: "us-central1", maxInstances: 10 }, async request => {
    const productId = typeof request.data?.productId === "string" ? request.data.productId.trim() : "";
    const submittedCode = typeof request.data?.code === "string" ? request.data.code.trim() : "";
    if (!productId || productId.length > 128 || /[.#$/\[\]]/.test(productId) ||
        !submittedCode || submittedCode.length > 256) {
        throw new HttpsError("invalid-argument", "A product and valid code are required.");
    }

    const requester = request.rawRequest?.ip || request.auth?.uid || "unknown";
    const requesterHash = createHash("sha256").update(requester).digest("hex");
    const attemptsRef = getDatabase().ref(`_productCodeAttempts/${requesterHash}`);
    const now = Date.now();
    const attempt = await attemptsRef.transaction(current => {
        const withinWindow = current && now - Number(current.windowStartedAt) < productCodeAttemptWindowMs;
        if (withinWindow && Number(current.attempts) >= productCodeAttemptLimit) return;
        return withinWindow
            ? { windowStartedAt: current.windowStartedAt, attempts: Number(current.attempts) + 1 }
            : { windowStartedAt: now, attempts: 1 };
    });
    if (!attempt.committed) {
        throw new HttpsError("resource-exhausted", "Too many code attempts. Try again later.");
    }

    const product = findProduct((await getDatabase().ref("products").once("value")).val(), productId)?.[1];
    if (!product) return { valid: false, disabled: true };

    const privateCode = (await getDatabase().ref(`productCodes/${productId}`).once("value")).val();
    if (!privateCode?.enabled || typeof privateCode.code !== "string" || !privateCode.code) {
        return { valid: false, disabled: true };
    }

    const submittedHash = createHash("sha256").update(submittedCode).digest();
    const savedHash = createHash("sha256").update(privateCode.code).digest();
    return { valid: timingSafeEqual(submittedHash, savedHash), disabled: false };
});

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

function findProduct(products, productId) {
    const entries = Array.isArray(products)
        ? products.map((product, index) => [String(index), product])
        : Object.entries(products || {});
    return entries.find(([, product]) => String(product?.id) === productId);
}

