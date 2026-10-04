/* ==================================================
   إعدادات الموقع
================================================== */

const STORAGE_KEY = "PUBG_MARKET_ACCOUNTS";
const SETTINGS_KEY = "PUBG_MARKET_SETTINGS";
const ORDERS_STORAGE_KEY = "GAMEVAULT_LOCAL_ORDERS";
const LOCAL_TEST_MODE = location.protocol === "file:" || ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
const ADMIN_EMAIL = "tameemdemir@gmail.com";
const CODE_VERIFICATION_URL = "https://gamevault-code-verifier.tameemdemir.workers.dev";
const AUTH_ACTION_SETTINGS = {
    url: "https://tameemdemir-create.github.io/gamevault/",
    handleCodeInApp: false
};
const WHATSAPP_NUMBER = "97470614812";
const USER_LEVEL_THRESHOLDS = { 1: 0, 2: 5000, 3: 20000, 4: 70000, 5: 150000 };

const COUNTRY_CODES = ["QA", "JO", "TR"];
const COUNTRY_CURRENCIES = { QA: "QAR", JO: "JOD", TR: "TRY" };

const COUNTRY_ALIASES = {
    "قطر": "QA",
    "الأردن": "JO",
    "تركيا": "TR"
};

function currencyForCountry(country) {
    return COUNTRY_CURRENCIES[countryCode(country).toUpperCase()] || COUNTRY_CURRENCIES.QA;
}


const I18N = {
    ar: {
        pageTitle: "Game Vault", languageLabel: "اللغة", badge: "PUBG MARKET", storeSubtitle: "متجر ببجي", heroTitle: "كل ما تحتاجه", heroTitleAccent: "لببجي",
        heroDescription: "حسابات ببجي، شدات UC ورويال باس.", browseStore: "تصفح المتجر",
        searchPlaceholder: "ابحث عن حساب أو شدات أو رويال باس...", search: "بحث", store: "المتجر",
        products: "منتجات PUBG", productCount: "{count} منتج", all: "الكل", accounts: "حسابات",
        uc: "شدات UC", ucProductLabel: "شدات", ucDeliveryPromise: "شدات تصل خلال 3 دقائق.", royalePass: "رويال باس", noProducts: "لا توجد منتجات",
        noProductsDescription: "لم يتم العثور على منتجات مطابقة للبحث.", countryFilter: "الدولة", countrySearchLabel: "البحث عن دولة", countrySearchPlaceholder: "ابحث عن دولة...",
        allCountries: "كل الدول", login: "تسجيل الدخول", register: "إنشاء حساب", logout: "تسجيل الخروج",
        authName: "الاسم", email: "البريد الإلكتروني", password: "كلمة السر", forgotPassword: "نسيت كلمة السر؟",
        invalidEmail: "اكتب بريدًا إلكترونيًا صحيحًا.", authEmailInUse: "هذا البريد مستخدم من قبل.", authInvalidEmail: "البريد الإلكتروني غير صالح.", authWeakPassword: "كلمة السر يجب أن تكون 6 أحرف على الأقل.", authWrongPassword: "البريد أو كلمة السر غير صحيحة.", authOperationNotAllowed: "يجب تفعيل طريقة الدخول من Firebase.", authUnauthorizedDomain: "تعذر تسجيل الدخول من هذا الرابط.", authUnauthorizedContinueUrl: "نطاق رابط البريد غير مسموح. أضف tameemdemir-create.github.io إلى النطاقات المسموحة في Firebase Authentication.", authInvalidApiKey: "مفتاح Firebase غير صحيح.", authNetworkError: "تعذر الاتصال بالإنترنت، حاول مرة أخرى.", authUserNotFound: "لا يوجد حساب بهذا البريد وكلمة السر.", authTooManyRequests: "تم إيقاف المحاولات مؤقتًا لكثرتها. انتظر قليلًا ثم أعد المحاولة.", authEmailQuotaExceeded: "وصل Firebase إلى حد إرسال الرسائل. تحقق من إعدادات البريد أو أعد المحاولة لاحقًا.",
        disposableEmail: "هذا النوع من الإيميلات المؤقتة غير مسموح.", verifyEmailSent: "تم إنشاء الحساب. افتح رابط التأكيد في بريدك الإلكتروني قبل تسجيل الدخول.", emailNotVerified: "أكد بريدك الإلكتروني أولًا من الرابط المرسل إليه.", resendVerification: "إعادة إرسال رسالة التأكيد", verificationSent: "تم إرسال رسالة تأكيد جديدة. افحص بريدك الإلكتروني.", verificationWait: "يمكنك إعادة الإرسال بعد {minutes}:{seconds}.",
        loginRequiredForUC: "يجب تسجيل الدخول حتى تضاف الشدات إلى رصيدك.",
        confirmPassword: "تأكيد كلمة السر", confirmPasswordPlaceholder: "أعد كتابة كلمة السر", passwordsDoNotMatch: "كلمتا السر غير متطابقتين.",
        emailExistsLogin: "هذا الإيميل مسجل مسبقًا. تم تحويلك إلى تسجيل الدخول.",
        profilePhoto: "الصورة الشخصية",
        chooseImage: "اختيار صورة", chooseImages: "اختيار صور",
        invalidPhoto: "تعذر قراءة الصورة. اختر صورة أخرى.",
        createAccountPrompt: "ليس لديك حساب؟ إنشاء حساب",
        namePlaceholder: "اكتب اسمك", passwordPlaceholder: "6 أحرف على الأقل", orderConfirmation: "تأكيد الطلب",
        purchaseOrder: "طلب شراء",
        revealProduct: "إظهار المنتج",
        deliveryCodeVerified: "تم التحقق من كود المنتج بنجاح. أكمل التسليم مع البائع.",
        playerIdLabel: "معرّف لاعب PUBG", userLevelAccessible: "مستوى المستخدم",
        adminPanel: "لوحة التحكم",
        adminDescription: "إضافة وتعديل وحذف حسابات وUC والرويال باس.",
        saveSettings: "حفظ الإعدادات", productType: "نوع المنتج", pubgAccount: "حساب PUBG", ucTopUp: "شدات PUBG UC",
        productName: "اسم المنتج", quantityLevel: "الكمية / المستوى",
        productDescription: "وصف المنتج",
        price: "السعر", productImages: "صور المنتج", imageLimit: "تستطيع اختيار حتى 10 صور.", saveProduct: "حفظ المنتج",
        newProduct: "منتج جديد", existingProducts: "المنتجات الموجودة",
        productNamePlaceholder: "مثال: حساب مستوى 70 / 660 UC / رويال باس",
        quantityPlaceholder: "مثال: 660 UC أو مستوى 70", descriptionPlaceholder: "اكتب تفاصيل المنتج هنا...",
        firebaseConfig: "إعدادات Firebase غير مكتملة.", enterEmail: "اكتب بريدك الإلكتروني أولًا.",
        resetSent: "تم إرسال رابط تغيير كلمة السر إلى بريدك الإلكتروني.", openBrowser: "افتح الرابط في Chrome أو Edge خارج معاينة VS Code.",
        openingLogin: "جاري فتح تسجيل الدخول...", saveSettingsSuccess: "تم حفظ بيانات حساب PUBG بنجاح.",
        uploadError: "تعذر رفع المنتجات الحالية إلى Firebase.", saveFirebaseError: "تعذر حفظ البيانات على Firebase. تحقق من قواعد قاعدة البيانات.",
        saveProductSuccess: "تم حفظ المنتج بنجاح!", noAdminProducts: "لا توجد منتجات حاليًا.", imageCount: "صور",
        customerOrders: "طلبات الشراء", noOrdersYet: "لا توجد طلبات بعد.", orderEmail: "بريد المشتري", orderProduct: "المنتج", orderTime: "وقت الطلب", orderStatus: "الحالة",
        translationProgress: "جاري ترجمة المنتج...",
        edit: "تعديل", delete: "حذف", confirmDelete: "هل تريد حذف المنتج {name}؟", incompleteFields: "يرجى إكمال الحقول المطلوبة.",
        missingGameCredentials: "لم يتم إعداد إيميل أو كلمة سر حساب PUBG من لوحة التحكم. يرجى إدخالهما أولًا.",
        missingAccountCredentials: "بيانات حساب PUBG غير مكتملة. أضف الإيميل وكلمة السر من لوحة التحكم أولًا.",
        notSet: "غير محدد",
        adminAccessDenied: "هذا الحساب غير مخوّل لفتح لوحة التحكم.",
        adminAccessError: "تعذر التحقق من صلاحية المدير. تحقق من إعداد Firebase واتصال الإنترنت.",
        greeting: "مرحبًا {name}", previousImage: "الصورة السابقة", nextImage: "الصورة التالية", closeImages: "إغلاق الصور",
        genericError: "حدث خطأ ({code}).", showPassword: "إظهار كلمة السر", hidePassword: "إخفاء كلمة السر", gameEmail: "إيميل حساب PUBG", gamePassword: "كلمة سر حساب PUBG", gameEmailPlaceholder: "pubg@example.com",
        pubgCredentials: "بيانات حساب PUBG", saveCredentials: "حفظ بيانات الحساب",
        enterUCAmount: "اكتب عدد الشدات في خانة الكمية", ucPackage: "باقة شدات PUBG",
        baseUC: "الشدات الأساسية", baseUCPlaceholder: "600", ucLevel: "مستوى المكافأة",
        levelOne: "المستوى 1 (+60)", levelTwo: "المستوى 2 (+150)", levelThree: "المستوى 3 (+250)", levelFour: "المستوى 4 (+400)", levelFive: "المستوى 5 (+600)",
        details: "التفاصيل", buy: "شراء", noImage: "لا توجد صورة", noDescription: "لا يوجد وصف لهذا المنتج.",
        type: "النوع", country: "الدولة", buyVia: "شراء", footerText: "حسابات PUBG • شدات UC • رويال باس — قطر والأردن وتركيا",
        stockLimit: "المخزون (اتركه فارغاً ليكون غير محدود)", stockRemaining: "المتبقي: {count}", stockUnlimited: "مخزون غير محدود", outOfStock: "نفدت الكمية"
        ,ucBalance: "رصيد UC: {count}", userLevel: "مستوى {level}"
        ,deliveryBadge: "تم التسليم", deliveryTitle: "بيانات حسابك", accountReady: "تم تجهيز حساب PUBG الخاص بك.",
        accountLogin: "إيميل الحساب", accountPassword: "كلمة السر", closeDelivery: "إغلاق", ucAdded: "تمت إضافة {count} UC إلى رصيدك."
        ,enableProductCode: "تفعيل الكود للزبون", accessCodeStatus: "حالة الكود", accessCodeEnabled: "مفعّل", accessCodeOff: "معطّل", verifyingCode: "جارٍ التحقق من الكود...", accessCodeDisabled: "الكود معطّل حالياً. تواصل مع البائع بعد إتمام الدفع.", accessCodeInvalid: "الكود غير صحيح.", accessCodesLoadError: "تعذر تحميل أكواد المنتجات الخاصة. انشر قواعد Firebase المحدّثة ثم حاول مجدداً.", accessCodeVerificationUnavailable: "تعذر التحقق من الكود الآن. حاول لاحقاً.", accessCodeRateLimited: "محاولات كثيرة. انتظر قليلاً ثم أعد المحاولة."
    },
    en: {
        pageTitle: "Game Vault", languageLabel: "Language", badge: "PUBG MARKET", storeSubtitle: "PUBG store", heroTitle: "Everything you need", heroTitleAccent: "for PUBG",
        heroDescription: "PUBG accounts, UC top-ups, and Royale Pass.", browseStore: "Browse store",
        searchPlaceholder: "Search for an account, UC, or Royale Pass...", search: "Search", store: "Store",
        products: "PUBG products", productCount: "{count} products", all: "All", accounts: "Accounts",
        uc: "UC top-ups", ucProductLabel: "UC top-up", ucDeliveryPromise: "UC delivered within 3 minutes.", royalePass: "Royale Pass", noProducts: "No products",
        noProductsDescription: "No products match your search.", countryFilter: "Country", countrySearchLabel: "Search countries", countrySearchPlaceholder: "Search countries...",
        allCountries: "All countries", login: "Log in", register: "Create account", logout: "Log out",
        authName: "Name", email: "Email", password: "Password", forgotPassword: "Forgot password?",
        invalidEmail: "Enter a valid email address.", authEmailInUse: "This email is already in use.", authInvalidEmail: "The email address is invalid.", authWeakPassword: "The password must be at least 6 characters.", authWrongPassword: "The email or password is incorrect.", authOperationNotAllowed: "Enable this sign-in method in Firebase.", authUnauthorizedDomain: "Sign-in is not allowed from this URL.", authUnauthorizedContinueUrl: "The email link domain is not authorized. Add tameemdemir-create.github.io to Firebase Authentication's authorized domains.", authInvalidApiKey: "The Firebase API key is invalid.", authNetworkError: "Network error. Please try again.", authUserNotFound: "No account was found with this email and password.", authTooManyRequests: "Too many attempts. Wait a while before trying again.", authEmailQuotaExceeded: "Firebase has reached its email-sending limit. Check email settings or try again later.",
        disposableEmail: "Temporary email addresses are not allowed.", verifyEmailSent: "Account created. Open the verification link in your email before signing in.", emailNotVerified: "Verify your email first using the link we sent.", resendVerification: "Resend verification email", verificationSent: "A new verification email was sent. Check your inbox.", verificationWait: "You can resend after {minutes}:{seconds}.",
        loginRequiredForUC: "You must sign in so the UC can be added to your balance.",
        confirmPassword: "Confirm password", confirmPasswordPlaceholder: "Re-enter your password", passwordsDoNotMatch: "The passwords do not match.",
        emailExistsLogin: "This email is already registered. You have been switched to sign in.",
        profilePhoto: "Profile photo",
        chooseImage: "Choose image", chooseImages: "Choose images",
        invalidPhoto: "Could not read the image. Choose another photo.",
        createAccountPrompt: "No account? Create one",
        namePlaceholder: "Enter your name", passwordPlaceholder: "At least 6 characters", orderConfirmation: "Order confirmation",
        purchaseOrder: "Purchase order",
        revealProduct: "Show product",
        deliveryCodeVerified: "Product code verified. Complete delivery with the seller.",
        playerIdLabel: "PUBG player ID", userLevelAccessible: "User level",
        adminPanel: "Admin panel",
        adminDescription: "Add, edit, and delete PUBG accounts, UC, and Royale Pass.",
        saveSettings: "Save settings", productType: "Product type", pubgAccount: "PUBG account", ucTopUp: "PUBG UC top-up",
        productName: "Product name", quantityLevel: "Quantity / level",
        productDescription: "Product description",
        price: "Price", productImages: "Product images", imageLimit: "You can select up to 10 images.", saveProduct: "Save product",
        newProduct: "New product", existingProducts: "Existing products",
        productNamePlaceholder: "Example: Level 70 account / 660 UC / Royale Pass",
        quantityPlaceholder: "Example: 660 UC or level 70", descriptionPlaceholder: "Enter product details...",
        firebaseConfig: "Firebase settings are incomplete.", enterEmail: "Enter your email first.",
        resetSent: "A password reset link was sent to your email.", openBrowser: "Open this link in Chrome or Edge outside the VS Code preview.",
        openingLogin: "Opening sign-in...", saveSettingsSuccess: "PUBG account details saved.",
        uploadError: "Could not upload the current products to Firebase.", saveFirebaseError: "Could not save to Firebase. Check the database rules.",
        saveProductSuccess: "Product saved successfully!", noAdminProducts: "No products yet.", imageCount: "images",
        customerOrders: "Customer orders", noOrdersYet: "No orders yet.", orderEmail: "Buyer email", orderProduct: "Product", orderTime: "Order time", orderStatus: "Status",
        translationProgress: "Translating product...",
        edit: "Edit", delete: "Delete", confirmDelete: "Delete product {name}?", incompleteFields: "Please complete the required fields.",
        missingGameCredentials: "PUBG account email or password is not configured in the admin panel. Add them first.",
        missingAccountCredentials: "PUBG account details are incomplete. Add the email and password in the admin panel first.",
        notSet: "Not set",
        adminAccessDenied: "This account is not authorized to open the admin panel.",
        adminAccessError: "Could not verify admin access. Check Firebase setup and your internet connection.",
        greeting: "Hello {name}", previousImage: "Previous image", nextImage: "Next image", closeImages: "Close images",
        genericError: "An error occurred ({code}).", showPassword: "Show password", hidePassword: "Hide password", gameEmail: "PUBG account email", gamePassword: "PUBG account password", gameEmailPlaceholder: "pubg@example.com",
        pubgCredentials: "PUBG account credentials", saveCredentials: "Save account details",
        enterUCAmount: "Enter the UC amount in the quantity field", ucPackage: "PUBG UC package",
        baseUC: "Base UC", baseUCPlaceholder: "600", ucLevel: "Bonus level",
        levelOne: "Level 1 (+60)", levelTwo: "Level 2 (+150)", levelThree: "Level 3 (+250)", levelFour: "Level 4 (+400)", levelFive: "Level 5 (+600)",
        details: "Details", buy: "Buy", noImage: "No image", noDescription: "No description for this product.",
        type: "Type", country: "Country", buyVia: "Buy", footerText: "PUBG accounts • UC • Royale Pass — Qatar, Jordan, and Turkey",
        stockLimit: "Stock limit (blank = unlimited)", stockRemaining: "Remaining: {count}", stockUnlimited: "Unlimited stock", outOfStock: "Out of stock"
        ,ucBalance: "UC balance: {count}", userLevel: "Lv. {level}"
        ,deliveryBadge: "Delivered", deliveryTitle: "Your account details", accountReady: "Your PUBG account is ready.",
        accountLogin: "Account email", accountPassword: "Password", closeDelivery: "Close", ucAdded: "{count} UC was added to your balance."
        ,enableProductCode: "Enable code for customer", accessCodeStatus: "Code status", accessCodeEnabled: "Enabled", accessCodeOff: "Disabled", verifyingCode: "Verifying code...", accessCodeDisabled: "This code is currently disabled. Contact the seller after completing payment.", accessCodeInvalid: "The code is incorrect.", accessCodesLoadError: "Could not load private product codes. Publish the updated Firebase rules and try again.", accessCodeVerificationUnavailable: "Could not verify the code right now. Please try again later.", accessCodeRateLimited: "Too many attempts. Wait a while and try again."
    }
};

for (const [locale, messages] of Object.entries(EXTRA_I18N)) {
    I18N[locale] = { ...I18N.en, ...messages };
}

const savedLanguage = localStorage.getItem("GAMEVAULT_LANGUAGE");
const SUPPORTED_LANGUAGES = ["ar", "en", "zh-CN", "es", "hi", "fr", "pt", "ru", "de", "id", "ja", "ko", "ur"];
const RTL_LANGUAGES = new Set(["ar", "ur"]);
let currentLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : "ar";

function t(key) {
    return I18N[currentLanguage]?.[key] || I18N.en[key] || I18N.ar[key] || key;
}

function countryCode(value) {
    return COUNTRY_ALIASES[value] || value || "";
}

function countryName(code) {
    const normalizedCode = countryCode(code).toUpperCase();
    try {
        return new Intl.DisplayNames([currentLanguage], { type: "region" }).of(normalizedCode) || normalizedCode;
    } catch {
        return normalizedCode;
    }
}

function flagForCountry(code) {
    return countryCode(code).toUpperCase().replace(/[A-Z]/g, letter => String.fromCodePoint(letter.charCodeAt(0) + 127397));
}

function countryLabel(code) {
    const normalizedCode = countryCode(code).toUpperCase();
    return `${flagForCountry(normalizedCode)} ${countryName(normalizedCode)}`;
}

function typeLabel(type) {
    const labels = { "حساب": "pubgAccount", UC: "ucTopUp", "Royale Pass": "royalePass" };
    return labels[type] ? t(labels[type]) : type;
}

function updateProductTypeVisibility() {
    const selectedType = $("accountType").value;
    const isAccount = selectedType === "حساب";
    const hidesImages = selectedType === "UC" || selectedType === "Royale Pass";
    $("pubgCredentialsSection").classList.toggle("hidden", !isAccount);
    $("accountImagesWrapper").classList.toggle("hidden", hidesImages);
    $("imagePreview").classList.toggle("hidden", hidesImages);
    if (hidesImages) {
        $("accountImages").value = "";
        selectedImages = [];
        $("imagePreview").innerHTML = "";
    }
}

function localizedProductText(arabicValue, englishValue, translations = {}, field = "name") {
    const localeValues = Object.fromEntries(
        Object.entries(translations || {}).map(([locale, values]) => [
            locale,
            typeof values === "string" ? values : values?.[field]
        ])
    );
    const values = { ar: arabicValue, en: englishValue, ...localeValues };
    const arabicText = typeof arabicValue === "string" ? arabicValue.trim() : "";
    const knownProductCopy = {
        "شدات": "ucProductLabel",
        "شدات تصل خلال 3 دقاق": "ucDeliveryPromise",
        "شدات تصل خلال 3 دقائق": "ucDeliveryPromise"
    }[arabicText];
    const explicitTranslation = localeValues[currentLanguage];
    if (typeof explicitTranslation === "string" && explicitTranslation.trim() && explicitTranslation.trim() !== arabicText) {
        return explicitTranslation.trim();
    }
    if (knownProductCopy) return t(knownProductCopy);
    const preferredValue = values[currentLanguage];
    if (typeof preferredValue === "string" && preferredValue.trim()) {
        return preferredValue.trim();
    }

    for (const fallbackLocale of ["en", "ar"]) {
        const fallbackValue = values[fallbackLocale];
        if (typeof fallbackValue === "string" && fallbackValue.trim()) {
            return fallbackValue.trim();
        }
    }

    return "";
}

function localizedProductQuantity(account) {
    if (account.type === "UC") {
        return ucSummary(account);
    }
    return localizedProductText(account.quantity, account.quantityEn, account.translations, "quantity");
}

function splitTranslationText(text, maximumBytes = 450) {
    const chunks = [];
    let currentChunk = "";
    for (const token of text.match(/\s+|\S+/gu) || [text]) {
        if (currentChunk && new TextEncoder().encode(currentChunk + token).length > maximumBytes) {
            chunks.push(currentChunk.trim());
            currentChunk = token.trimStart();
        } else {
            currentChunk += token;
        }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    return chunks;
}

async function translateTextWithMyMemory(text, locale) {
    const translatedChunks = [];
    for (const chunk of splitTranslationText(text)) {
        const query = new URLSearchParams({ q: chunk, langpair: `ar|${locale}`, mt: "1" });
        const response = await fetch(`https://api.mymemory.translated.net/get?${query}`);
        if (!response.ok) throw new Error(`Translation request failed (${response.status}).`);

        const data = await response.json();
        const translatedText = data.responseData?.translatedText;
        if (data.quotaFinished || data.responseStatus !== 200 || !translatedText) {
            throw new Error(data.responseDetails || "The free translation limit may have been reached.");
        }
        translatedChunks.push(translatedText);
    }
    return translatedChunks.join(" ");
}

async function translateProductFields(sourceFields, targetFields) {
    const translations = {};
    const jobs = Object.entries(targetFields).flatMap(([locale, fields]) =>
        fields.map(field => ({ locale, field }))
    );
    let nextJob = 0;

    async function runWorker() {
        while (nextJob < jobs.length) {
            const job = jobs[nextJob++];
            try {
                const translatedText = await translateTextWithMyMemory(sourceFields[job.field], job.locale);
                translations[job.locale] ||= {};
                translations[job.locale][job.field] = translatedText;
            } catch (error) {
                console.warn(`Could not translate ${job.field} to ${job.locale}.`, error);
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(3, jobs.length) }, runWorker));
    return translations;
}

async function translateProductsForLanguage(locale) {
    if (locale === "ar") return;

    const fields = ["name", "quantity", "description"];
    const productsToTranslate = accounts.map(account => {
        const existingTranslation = typeof account.translations?.[locale] === "string"
            ? { name: account.translations[locale] }
            : account.translations?.[locale] || {};
        const sourceFields = {
            name: account.name,
            quantity: account.quantity,
            description: account.description
        };
        const missingFields = fields.filter(field =>
            sourceFields[field] && !String(existingTranslation[field] || "").trim()
        );
        return {
            account,
            existingTranslation,
            sourceFields,
            missingFields,
            pendingKey: `${account.id}:${locale}`
        };
    }).filter(product => product.missingFields.length && !pendingProductTranslations.has(product.pendingKey));

    let nextProduct = 0;
    let translatedAny = false;

    async function translateNextProducts() {
        while (nextProduct < productsToTranslate.length) {
            const product = productsToTranslate[nextProduct++];
            pendingProductTranslations.add(product.pendingKey);
            try {
                const result = await translateProductFields(product.sourceFields, { [locale]: product.missingFields });
                const translatedFields = result[locale];
                if (!translatedFields || Object.keys(translatedFields).length === 0) continue;

                product.account.translations = {
                    ...(product.account.translations || {}),
                    [locale]: { ...product.existingTranslation, ...translatedFields }
                };
                if (locale === "en") {
                    product.account.nameEn = product.account.translations.en.name || product.account.nameEn || "";
                    product.account.quantityEn = product.account.translations.en.quantity || product.account.quantityEn || "";
                    product.account.descriptionEn = product.account.translations.en.description || product.account.descriptionEn || "";
                }
                translatedAny = true;

                if (currentLanguage === locale) {
                    renderAccounts();
                    if (currentAccount && !$('detailsModal').classList.contains('hidden')) {
                        showDetails(currentAccount.id);
                    } else if (currentAccount && !$('buyModal').classList.contains('hidden')) {
                        openBuy(currentAccount.id, false);
                    }
                }
            } catch (error) {
                console.warn(`Could not translate product ${product.account.id} to ${locale}.`, error);
            } finally {
                pendingProductTranslations.delete(product.pendingKey);
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(2, productsToTranslate.length) }, translateNextProducts));
    if (!translatedAny) return;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(LOCAL_TEST_MODE ? accounts : publicAccounts(accounts))
    );
    await saveAccounts();
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = RTL_LANGUAGES.has(currentLanguage) ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
        element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });
    $("languageToggle").value = currentLanguage;
    $("languageToggle").setAttribute("aria-label", t("languageLabel"));
    $("authTitle").textContent = authMode === "login" ? t("login") : t("register");
    $("authSubmit").textContent = authMode === "login" ? t("login") : t("register");
    $("authSwitch").textContent = authMode === "login" ? t("createAccountPrompt") : `${t("register")} / ${t("login")}`;
    $("passwordToggle").setAttribute("aria-label", $("authPassword").type === "text" ? t("hidePassword") : t("showPassword"));
    $("authPasswordConfirmToggle").setAttribute("aria-label", $("authPasswordConfirm").type === "text" ? t("hidePassword") : t("showPassword"));
    $("gameAccountPasswordToggle").setAttribute("aria-label", $("gameAccountPassword").type === "text" ? t("hidePassword") : t("showPassword"));
    populateCountryOptions();
    renderAccounts();
    if (currentAccount && !$('detailsModal').classList.contains('hidden')) {
        showDetails(currentAccount.id);
    } else if (currentAccount && !$('buyModal').classList.contains('hidden')) {
        openBuy(currentAccount.id, false);
    }
    if (!$('adminModal').classList.contains('hidden')) {
        renderAdmin();
    }
    if (currentDelivery && !$('deliveryModal').classList.contains('hidden')) {
        showDelivery(
            currentDelivery.account,
            currentDelivery.gameAccountEmail,
            currentDelivery.gameAccountPassword,
            currentDelivery.playerId
        );
    }
    if (auth?.currentUser) {
        updateAuthUI(auth.currentUser);
    }
}

function populateCountryOptions() {
    const filter = $("countryFilter");
    const accountSelect = $("accountCountry");
    const options = $("countryOptions");
    const adminOptions = $("accountCountryOptions");
    if (!filter || !accountSelect || !options || !adminOptions) return;
    const selectedFilter = filter.value || "all";
    const selectedAccount = countryCode(accountSelect.dataset.selectedCountry || accountSelect.value) || "QA";
    const search = $("countrySearch")?.value.trim().toLocaleLowerCase(currentLanguage) || "";
    const filteredCountries = COUNTRY_CODES.filter(code => {
        const name = countryName(code).toLocaleLowerCase(currentLanguage);
        return !search || name.includes(search) || code.toLowerCase().includes(search);
    });
    options.innerHTML = [
        `<button class="country-option" type="button" role="option" aria-selected="${selectedFilter === "all"}" data-country="all">${escapeHTML(t("allCountries"))}</button>`,
        ...filteredCountries.map(code => `<button class="country-option" type="button" role="option" aria-selected="${selectedFilter === code}" data-country="${code}">${escapeHTML(countryLabel(code))}</button>`)
    ].join("");
    const adminCountrySearch = $("accountCountrySearch")?.value.trim().toLocaleLowerCase(currentLanguage) || "";
    const matchingAdminCountries = COUNTRY_CODES.filter(code => {
        const name = countryName(code).toLocaleLowerCase(currentLanguage);
        return !adminCountrySearch || name.includes(adminCountrySearch) || code.toLowerCase().includes(adminCountrySearch);
    });
    adminOptions.innerHTML = matchingAdminCountries
        .map(code => `<button class="country-option" type="button" role="option" aria-selected="${code === selectedAccount}" data-value="${code}">${escapeHTML(countryLabel(code))}</button>`)
        .join("");
    accountSelect.innerHTML = COUNTRY_CODES
        .map(code => `<option value="${code}">${escapeHTML(countryLabel(code))}</option>`).join("");
    filter.value = selectedFilter === "all" || COUNTRY_CODES.includes(selectedFilter) ? selectedFilter : "all";
    $("countrySelectedLabel").textContent = filter.value === "all" ? t("allCountries") : countryLabel(filter.value);
    accountSelect.dataset.selectedCountry = COUNTRY_CODES.includes(selectedAccount) ? selectedAccount : "QA";
    accountSelect.value = accountSelect.dataset.selectedCountry;
    $("accountCountrySelectedLabel").textContent = countryLabel(accountSelect.dataset.selectedCountry);
}

const DEFAULT_SETTINGS = {
    gameAccountEmail: LOCAL_TEST_MODE ? "demo@gamevault.invalid" : "",
    gameAccountPassword: LOCAL_TEST_MODE ? "demo-only-password" : ""
};

function buildDemoTranslations(translationRows) {
    const fieldNames = ["name", "quantity", "description"];
    return Object.fromEntries(Object.entries(translationRows).map(([locale, values]) => [
        locale,
        Object.fromEntries(fieldNames.map((field, index) => [field, values[index]]))
    ]));
}

const LOCAL_DEMO_TRANSLATIONS = {
    account: buildDemoTranslations({
        ar: ["حساب PUBG تجريبي", "المستوى 70", "حساب تجريبي لاختبار تفاصيل المنتج والشراء المحلي."],
        en: ["Demo PUBG account", "Level 70", "Sample account for testing product details and local checkout."],
        "zh-CN": ["PUBG 账号示例", "70级", "用于测试商品详情和本地结账的示例账号。"],
        es: ["Cuenta PUBG de prueba", "Nivel 70", "Cuenta de muestra para probar los detalles y la compra local."],
        hi: ["डेमो PUBG खाता", "लेवल 70", "उत्पाद विवरण और स्थानीय खरीदारी जाँचने के लिए नमूना खाता।"],
        fr: ["Compte PUBG de démonstration", "Niveau 70", "Compte exemple pour tester les détails et l’achat local."],
        pt: ["Conta PUBG de demonstração", "Nível 70", "Conta de exemplo para testar detalhes e compra local."],
        ru: ["Демо-аккаунт PUBG", "Уровень 70", "Пример аккаунта для проверки товара и локальной покупки."],
        de: ["PUBG-Demokonto", "Level 70", "Beispielkonto zum Testen von Produktdetails und lokalem Kauf."],
        id: ["Akun PUBG demo", "Level 70", "Akun contoh untuk menguji detail produk dan pembelian lokal."],
        ja: ["PUBGデモアカウント", "レベル70", "商品詳細とローカル購入をテストするサンプルアカウント。"],
        ko: ["PUBG 데모 계정", "레벨 70", "상품 정보와 로컬 구매 테스트용 샘플 계정입니다."],
        ur: ["PUBG کا ڈیمو اکاؤنٹ", "لیول 70", "پروڈکٹ کی تفصیلات اور مقامی خریداری جانچنے کے لیے نمونہ اکاؤنٹ۔"]
    }),
    uc: buildDemoTranslations({
        ar: ["باقة شدات تجريبية", "660 UC", "باقة تجريبية لاختبار الشراء المحلي."],
        en: ["Demo UC package", "660 UC", "Sample UC package for testing local checkout."],
        "zh-CN": ["UC 示例套餐", "660 UC", "用于测试本地结账的 UC 示例套餐。"],
        es: ["Paquete UC de prueba", "660 UC", "Paquete UC de muestra para probar la compra local."],
        hi: ["डेमो UC पैकेज", "660 UC", "स्थानीय खरीदारी जाँचने के लिए नमूना UC पैकेज।"],
        fr: ["Pack UC de démonstration", "660 UC", "Pack UC exemple pour tester l’achat local."],
        pt: ["Pacote UC de demonstração", "660 UC", "Pacote UC de exemplo para testar a compra local."],
        ru: ["Демо-пакет UC", "660 UC", "Пример пакета UC для проверки локальной покупки."],
        de: ["UC-Demopaket", "660 UC", "Beispielpaket zum Testen des lokalen Kaufs."],
        id: ["Paket UC demo", "660 UC", "Paket UC contoh untuk menguji pembelian lokal."],
        ja: ["UCデモパック", "660 UC", "ローカル購入をテストするためのUCサンプルパック。"],
        ko: ["UC 데모 패키지", "660 UC", "로컬 구매 테스트용 UC 샘플 패키지입니다."],
        ur: ["UC کا ڈیمو پیکج", "660 UC", "مقامی خریداری جانچنے کے لیے نمونہ UC پیکج۔"]
    }),
    royale: buildDemoTranslations({
        ar: ["رويال باس تجريبي", "30 يومًا", "منتج تجريبي لاختبار بطاقة الرويال باس والشراء المحلي."],
        en: ["Demo Royale Pass", "30 days", "Sample product for testing the Royale Pass card and local checkout."],
        "zh-CN": ["Royale Pass 示例", "30天", "用于测试 Royale Pass 卡片和本地结账的示例商品。"],
        es: ["Royale Pass de prueba", "30 días", "Producto de muestra para probar la tarjeta Royale Pass y la compra local."],
        hi: ["डेमो Royale Pass", "30 दिन", "Royale Pass कार्ड और स्थानीय खरीदारी जाँचने के लिए नमूना उत्पाद।"],
        fr: ["Royale Pass de démonstration", "30 jours", "Produit exemple pour tester la carte Royale Pass et l’achat local."],
        pt: ["Royale Pass de demonstração", "30 dias", "Produto de exemplo para testar o cartão Royale Pass e a compra local."],
        ru: ["Демо Royale Pass", "30 дней", "Пример товара для проверки карточки Royale Pass и локальной покупки."],
        de: ["Royale-Pass-Demo", "30 Tage", "Beispielprodukt zum Testen der Royale-Pass-Karte und des lokalen Kaufs."],
        id: ["Royale Pass demo", "30 hari", "Produk contoh untuk menguji kartu Royale Pass dan pembelian lokal."],
        ja: ["Royale Passデモ", "30日間", "Royale Passカードとローカル購入をテストするサンプル商品。"],
        ko: ["Royale Pass 데모", "30일", "Royale Pass 카드와 로컬 구매 테스트용 샘플 상품입니다."],
        ur: ["Royale Pass ڈیمو", "30 دن", "Royale Pass کارڈ اور مقامی خریداری جانچنے کے لیے نمونہ پروڈکٹ۔"]
    })
};

const LOCAL_DEMO_ACCOUNTS = [
    {
        id: "local-demo-account",
        type: "حساب",
        name: "حساب PUBG تجريبي",
        nameEn: "Demo PUBG account",
        quantity: "المستوى 70",
        quantityEn: "Level 70",
        description: "حساب تجريبي لاختبار تفاصيل المنتج والشراء المحلي.",
        descriptionEn: "Sample account for testing product details and local checkout.",
        translations: LOCAL_DEMO_TRANSLATIONS.account,
        country: "QA",
        price: 25,
        currency: "QAR",
        images: []
    },
    {
        id: "local-demo-uc",
        type: "UC",
        name: "باقة شدات تجريبية",
        nameEn: "Demo UC package",
        quantity: "660 UC",
        quantityEn: "660 UC",
        description: "باقة تجريبية لاختبار الشراء المحلي.",
        descriptionEn: "Sample package for testing local checkout.",
        translations: LOCAL_DEMO_TRANSLATIONS.uc,
        country: "QA",
        price: 5,
        currency: "QAR",
        images: []
    },
    {
        id: "local-demo-royale",
        type: "Royale Pass",
        name: "رويال باس تجريبي",
        nameEn: "Demo Royale Pass",
        quantity: "30 يومًا",
        quantityEn: "30 days",
        description: "منتج تجريبي لاختبار بطاقة الرويال باس والشراء المحلي.",
        descriptionEn: "Sample product for testing the Royale Pass card and local checkout.",
        translations: LOCAL_DEMO_TRANSLATIONS.royale,
        country: "QA",
        price: 8,
        currency: "QAR",
        images: []
    }
];

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCqftmFq09lF9MsU19Q9QKhxR6RIu6X0WM",
    authDomain: "gamevault-5458b.firebaseapp.com",
    databaseURL: "https://gamevault-5458b-default-rtdb.firebaseio.com",
    projectId: "gamevault-5458b",
    storageBucket: "gamevault-5458b.firebasestorage.app",
    messagingSenderId: "886740058119",
    appId: "1:886740058119:web:51de63a7d6950c7e7a6aa2",
    measurementId: "G-CN11W2BWK7"
};

const firebaseReady =
    !LOCAL_TEST_MODE
    &&
    window.firebase
    && !FIREBASE_CONFIG.apiKey.startsWith("ضع_")
    && FIREBASE_CONFIG.databaseURL
    && !FIREBASE_CONFIG.databaseURL.startsWith("ضع_");

let auth = null;
let authMode = "login";
let selectedAuthImage = "";
let registrationInProgress = false;

let remoteAccounts = null;
let remoteProductCodes = null;
let remoteProfiles = null;
let adminProductCodes = {};
let adminProductCodesLoaded = false;
let adminProductCodesLoadPromise = null;
let remoteProductsLoaded = false;
let remoteCodeMigrationNeeded = false;
const legacyProductCodes = {};
const profileCache = new Map();
const loadedProfiles = new Set();

if (firebaseReady) {
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        remoteAccounts = firebase.database().ref("products");
        remoteProductCodes = firebase.database().ref("productCodes");
        remoteProfiles = firebase.database().ref("profiles");
        auth = firebase.auth();
    } catch (error) {
        console.error("Firebase initialization failed", error);
    }
}

let currentAccount = null;
let currentDelivery = null;
let selectedImages = [];
let savedProductTranslations = {};
const pendingProductTranslations = new Set();

let accounts = [];

function normalizeAccounts(result) {
    return (Array.isArray(result) ? result : Object.values(result || {}))
        .map(account => ({
            ...account,
            id: account.id === undefined || account.id === null || account.id === "" ? createID() : String(account.id),
            type: account.type || "حساب",
            quantity: account.quantity || "",
            stock: normalizeStock(account.stock),
            accessCodeEnabled: account.accessCodeEnabled === true,
            images: Array.isArray(account.images) ? account.images : []
        }));
}

function normalizeStock(stock) {
    if (stock === null || stock === undefined || stock === "") return null;
    const value = Number(stock);
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function isAdminUser(user) {
    return Boolean(user?.emailVerified && user.email?.trim().toLowerCase() === ADMIN_EMAIL);
}

function publicAccount(account) {
    const { accessCode, accessCodeEnabled, ...product } = account;
    return product;
}

function publicAccounts(products) {
    return products.map(publicAccount);
}

function withAdminProductCodes(products) {
    if (LOCAL_TEST_MODE) return products;
    if (!adminProductCodesLoaded) return products.map(publicAccount);
    return products.map(account => ({
        ...publicAccount(account),
        accessCode: adminProductCodes[account.id]?.code || "",
        accessCodeEnabled: adminProductCodes[account.id]?.enabled === true
    }));
}

function collectLegacyProductCodes(products, captureCodes = false) {
    const entries = Array.isArray(products) ? products : Object.values(products || {});
    let foundPrivateFields = false;
    for (const product of entries) {
        if (!product || typeof product !== "object") continue;
        if (Object.hasOwn(product, "accessCode") || Object.hasOwn(product, "accessCodeEnabled")) {
            foundPrivateFields = true;
        }
        const code = String(product.accessCode || "").trim();
        if (captureCodes && code && product.id !== undefined && product.id !== null) {
            legacyProductCodes[String(product.id)] = {
                code,
                enabled: product.accessCodeEnabled === true
            };
        }
    }
    return foundPrivateFields;
}

async function saveRemoteAccounts(products) {
    if (!remoteAccounts) return;
    if (isAdminUser(auth?.currentUser) && remoteProductCodes) {
        const codes = Object.fromEntries(
            products
                .filter(account => String(account.accessCode || "").trim())
                .map(account => [String(account.id), {
                    code: String(account.accessCode).trim(),
                    enabled: account.accessCodeEnabled === true
                }])
        );
        await firebase.database().ref().update({
            products: publicAccounts(products),
            productCodes: codes
        });
        adminProductCodes = codes;
        adminProductCodesLoaded = true;
        for (const productId of Object.keys(legacyProductCodes)) delete legacyProductCodes[productId];
        remoteCodeMigrationNeeded = false;
        return;
    }
    await remoteAccounts.set(publicAccounts(products));
}

async function loadAdminProductCodes(user) {
    if (!remoteProductCodes || !isAdminUser(user)) return false;
    if (adminProductCodesLoadPromise) return adminProductCodesLoadPromise;
    if (adminProductCodesLoaded) return true;

    adminProductCodesLoadPromise = (async () => {
        try {
            const [snapshot, productsSnapshot] = await Promise.all([
                remoteProductCodes.once("value"),
                remoteAccounts.once("value")
            ]);
            if (!isAdminUser(auth?.currentUser) || auth.currentUser.uid !== user.uid) return false;
            adminProductCodes = snapshot.val() || {};
            if (productsSnapshot.exists()) {
                const remoteValue = productsSnapshot.val();
                remoteCodeMigrationNeeded = collectLegacyProductCodes(remoteValue, true);
                remoteProductsLoaded = true;
                accounts = normalizeAccounts(remoteValue);
            }
            for (const account of accounts) {
                const legacyCode = legacyProductCodes[account.id];
                if (legacyCode && !adminProductCodes[account.id]) {
                    adminProductCodes[account.id] = legacyCode;
                }
            }
            adminProductCodesLoaded = true;
            accounts = withAdminProductCodes(accounts);

            if (remoteProductsLoaded && remoteCodeMigrationNeeded) {
                await saveRemoteAccounts(accounts);
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(publicAccounts(accounts)));
            }
            renderAccounts();
            if (!$("adminModal").classList.contains("hidden")) renderAdmin();
            return true;
        } catch (error) {
            adminProductCodesLoaded = false;
            console.error("Could not load private product codes", error);
            alert(t("accessCodesLoadError"));
            return false;
        } finally {
            adminProductCodesLoadPromise = null;
        }
    })();
    return adminProductCodesLoadPromise;
}

function hasLimitedStock(account) {
    return Number.isSafeInteger(account.stock)
        && account.stock >= 0;
}

function isOutOfStock(account) {
    return hasLimitedStock(account) && account.stock === 0;
}

function stockSummary(account) {
    if (!hasLimitedStock(account)) return t("stockUnlimited");
    if (account.stock === 0) return t("outOfStock");
    return t("stockRemaining").replace("{count}", new Intl.NumberFormat(currentLanguage).format(account.stock));
}

function getUCDetails(account) {
    if (account.type !== "UC") {
        return null;
    }
    const base = Number.parseInt(String(account.quantity || account.name).replace(/[^0-9]/g, ""), 10) || 0;
    return { base, total: base };
}

function ucSummary(account) {
    const details = getUCDetails(account);
    if (!details || !details.base) return "";
    return `${new Intl.NumberFormat(currentLanguage).format(details.total)} UC`;
}

function ucProductVisual(account) {
    const details = getUCDetails(account);
    if (!details || !details.base) {
        return `<strong>UC</strong><span>${escapeHTML(t("enterUCAmount"))}</span>`;
    }
    return `<strong>${new Intl.NumberFormat(currentLanguage).format(details.total)} UC</strong><span>${t("ucPackage")}</span>`;
}

function royalePassVisual(account) {
    const quantity = localizedProductQuantity(account);
    return `
        <span class="royale-pass-emblem" aria-hidden="true">RP</span>
        <strong>${escapeHTML(t("royalePass"))}</strong>
        ${quantity ? `<span>${escapeHTML(quantity)}</span>` : ""}
    `;
}

function getUserLevel(ucBalance) {
    const total = Number(ucBalance) || 0;
    if (total >= USER_LEVEL_THRESHOLDS[5]) return 5;
    if (total >= USER_LEVEL_THRESHOLDS[4]) return 4;
    if (total >= USER_LEVEL_THRESHOLDS[3]) return 3;
    if (total >= USER_LEVEL_THRESHOLDS[2]) return 2;
    return 1;
}

function loadAccounts() {

    const data = localStorage.getItem(STORAGE_KEY);

    let localAccounts = [];

    if (data) {
        try {
            localAccounts = normalizeAccounts(JSON.parse(data));
        } catch {
            localAccounts = [];
        }
    } else if (LOCAL_TEST_MODE) {
        localAccounts = normalizeAccounts(LOCAL_DEMO_ACCOUNTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localAccounts));
    }

    if (!LOCAL_TEST_MODE) {
        remoteCodeMigrationNeeded = collectLegacyProductCodes(localAccounts) || remoteCodeMigrationNeeded;
        localAccounts = localAccounts.map(publicAccount);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localAccounts));
    }

    if (LOCAL_TEST_MODE) {
        const demoProducts = new Map(LOCAL_DEMO_ACCOUNTS.map(product => [product.id, product]));
        let addedDemoTranslations = false;
        localAccounts = localAccounts.map(account => {
            const demoProduct = demoProducts.get(account.id);
            const sourceMatchesDemo = demoProduct && ["name", "quantity", "description"]
                .every(field => (account[field] || "") === (demoProduct[field] || ""));
            if (!sourceMatchesDemo) return account;

            addedDemoTranslations = true;
            return {
                ...account,
                translations: { ...demoProduct.translations, ...(account.translations || {}) }
            };
        });
        if (addedDemoTranslations) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(localAccounts));
        }
    }

    accounts = localAccounts;
    renderAccounts();

    if (remoteAccounts) {
        let isInitialRemoteSnapshot = true;
        remoteAccounts.on("value", async snapshot => {
            if (isInitialRemoteSnapshot) {
                isInitialRemoteSnapshot = false;
                if (!snapshot.exists() && localAccounts.length) {
                    remoteProductsLoaded = true;
                    if (isAdminUser(auth?.currentUser) && !adminProductCodesLoaded) {
                        if (!await loadAdminProductCodes(auth.currentUser)) return;
                    }
                    accounts = withAdminProductCodes(localAccounts);
                    renderAccounts();
                    if (isAdminUser(auth?.currentUser)) {
                        try {
                            await saveRemoteAccounts(accounts);
                        } catch (error) {
                            console.error("Could not upload products and private codes", error);
                            alert(t("uploadError"));
                        }
                    }
                    return;
                }
            }

            const remoteValue = snapshot.val();
            remoteCodeMigrationNeeded = collectLegacyProductCodes(remoteValue, isAdminUser(auth?.currentUser)) || remoteCodeMigrationNeeded;
            remoteProductsLoaded = true;
            const remoteAccountsValue = normalizeAccounts(remoteValue);
            if (adminProductCodesLoaded) {
                for (const account of remoteAccountsValue) {
                    const legacyCode = legacyProductCodes[account.id];
                    if (legacyCode && !adminProductCodes[account.id]) {
                        adminProductCodes[account.id] = legacyCode;
                    }
                }
            }
            accounts = withAdminProductCodes(remoteAccountsValue);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(publicAccounts(accounts)));
            renderAccounts();

            if (isAdminUser(auth?.currentUser) && adminProductCodesLoaded && remoteCodeMigrationNeeded) {
                try {
                    await saveRemoteAccounts(accounts);
                    accounts = withAdminProductCodes(accounts);
                    renderAccounts();
                } catch (error) {
                    console.error("Could not migrate public product codes", error);
                    alert(t("saveFirebaseError"));
                }
            }
        });
    }
}

async function saveAccounts() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(LOCAL_TEST_MODE ? accounts : publicAccounts(accounts))
    );

    if (!remoteAccounts) return true;
    try {
        await saveRemoteAccounts(accounts);
        return true;
    } catch (error) {
        console.error("Could not save products and private codes to Firebase", error);
        alert(t("saveFirebaseError"));
        return false;
    }
}

function loadSettings() {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) {
        return { ...DEFAULT_SETTINGS };
    }

    try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
        return { ...DEFAULT_SETTINGS };
    }
}

function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function populateSettingsFields() {
    const settings = loadSettings();
    $("gameAccountEmail") && ($("gameAccountEmail").value = settings.gameAccountEmail || "");
    $("gameAccountPassword") && ($("gameAccountPassword").value = settings.gameAccountPassword || "");
}

$("saveGameCredentialsButton")?.addEventListener("click", function() {
    const settings = loadSettings();
    settings.gameAccountEmail = $("gameAccountEmail").value.trim();
    settings.gameAccountPassword = $("gameAccountPassword").value.trim();
    saveSettings(settings);
    alert(t("saveSettingsSuccess"));
});

loadAccounts();
populateSettingsFields();
configureCheckoutMode();

function createID() {
    return Date.now().toString() + Math.random().toString(36).substring(2);
}

function $(id) {
    return document.getElementById(id);
}

function configureCheckoutMode() {
    const buttonLabel = $("submitBuyButton").querySelector("span");

    $("copyrightYear").textContent = new Date().getFullYear();
    buttonLabel.dataset.i18n = "revealProduct";
    buttonLabel.textContent = "إظهار الحساب";
    $("submitBuyButton").disabled = false;

    if (LOCAL_TEST_MODE && !auth) {
        updateAuthUI(null);
        $("localAdminButton").classList.remove("hidden");
        $("localAdminButton").addEventListener("click", openAdmin);
    }
}

function openModal(id) {
    $(id).classList.remove("hidden");
}

function closeModal(id) {
    $(id).classList.add("hidden");
    if (id === "buyModal") $("buyForm").reset();
    if (id === "deliveryModal") currentDelivery = null;
}

function openAuth(mode) {
    authMode = mode;
    $("authPassword").type = "password";
    $("authPasswordConfirm").type = "password";
    $("passwordToggle").setAttribute("aria-pressed", "false");
    $("authPasswordConfirmToggle").setAttribute("aria-pressed", "false");
    $("authTitle").textContent = mode === "login" ? t("login") : t("register");
    $("authNameGroup").classList.toggle("hidden", mode === "login");
    $("authPhotoGroup").classList.toggle("hidden", mode === "login");
    $("authPasswordConfirmGroup").classList.toggle("hidden", mode === "login");
    $("forgotPassword").classList.toggle("hidden", mode !== "login");
    $("authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
    $("authSubmit").textContent = mode === "login" ? t("login") : t("register");
    $("authSwitch").textContent = mode === "login" ? t("createAccountPrompt") : `${t("register")} / ${t("login")}`;
    $("authMessage").textContent = "";
    $("resendVerification").classList.add("hidden");
    $("verificationCooldown").textContent = "";
    $("authPhoto").value = "";
    selectedAuthImage = "";
    $("authPhotoPreview").src = "";
    $("authPhotoPreview").classList.add("hidden");
    $("authPasswordConfirm").value = "";
    openModal("authModal");
}

function authErrorMessage(error) {
    const messageKeys = {
        "auth/email-already-in-use": "authEmailInUse",
        "auth/invalid-email": "authInvalidEmail",
        "auth/weak-password": "authWeakPassword",
        "auth/wrong-password": "authWrongPassword",
        "auth/operation-not-allowed": "authOperationNotAllowed",
        "auth/unauthorized-domain": "authUnauthorizedDomain",
        "auth/unauthorized-continue-uri": "authUnauthorizedContinueUrl",
        "auth/invalid-continue-uri": "authUnauthorizedContinueUrl",
        "auth/invalid-api-key": "authInvalidApiKey",
        "auth/network-request-failed": "authNetworkError",
        "auth/user-not-found": "authUserNotFound",
        "auth/too-many-requests": "authTooManyRequests",
        "auth/quota-exceeded": "authEmailQuotaExceeded"
    };
    const message = t(messageKeys[error.code] || "genericError");
    return message.replace("{code}", error.code || "unknown");
}

const DISPOSABLE_EMAIL_DOMAINS = new Set([
    "10minutemail.com", "guerrillamail.com", "mailinator.com", "tempmail.com",
    "temp-mail.org", "yopmail.com", "sharklasers.com", "trashmail.com"
]);
const VERIFICATION_COOLDOWN_MS = 5 * 60 * 1000;
let verificationTimer = null;

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isDisposableEmail(email) {
    return DISPOSABLE_EMAIL_DOMAINS.has(email.toLowerCase().split("@")[1]);
}

function verificationCooldownKey(email) {
    return `GAMEVAULT_VERIFICATION_COOLDOWN_${email.toLowerCase()}`;
}

function startVerificationCooldown(email) {
    const expiresAt = Date.now() + VERIFICATION_COOLDOWN_MS;
    localStorage.setItem(verificationCooldownKey(email), String(expiresAt));
    updateVerificationCooldown(email);
}

function updateVerificationCooldown(email) {
    if (verificationTimer) {
        clearInterval(verificationTimer);
    }

    const resendButton = $("resendVerification");
    const cooldown = $("verificationCooldown");
    const tick = () => {
        const remaining = Math.max(0, Number(localStorage.getItem(verificationCooldownKey(email)) || 0) - Date.now());
        resendButton.disabled = remaining > 0;
        if (remaining <= 0) {
            cooldown.textContent = "";
            clearInterval(verificationTimer);
            return;
        }
        const totalSeconds = Math.ceil(remaining / 1000);
        cooldown.textContent = t("verificationWait")
            .replace("{minutes}", String(Math.floor(totalSeconds / 60)).padStart(2, "0"))
            .replace("{seconds}", String(totalSeconds % 60).padStart(2, "0"));
    };
    tick();
    verificationTimer = setInterval(tick, 1000);
}

function getEmailDisplayName(user) {
    return (user.email || "user")
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase())
        .trim();
}

function getUserPhoto(user) {
    if (!user) {
        return "";
    }

    return localStorage.getItem(`GAMEVAULT_PROFILE_PHOTO_${user.uid}`) || user.photoURL || "";
}

function getCachedUserProfile(user) {
    let profile = profileCache.get(user.uid);
    if (!profile) {
        try {
            profile = JSON.parse(localStorage.getItem(`GAMEVAULT_PROFILE_${user.uid}`) || "null") || {};
        } catch {
            profile = {};
        }
        profileCache.set(user.uid, profile);
    }
    return profile;
}

async function saveUserProfile(user, profile = {}) {
    const data = {
        name: profile.name || user.displayName || getEmailDisplayName(user),
        photoURL: profile.photoURL || getUserPhoto(user),
        email: user.email || "",
        provider: "password",
        ucBalance: Number(profile.ucBalance) || Number(getCachedUserProfile(user).ucBalance) || 0
    };
    profileCache.set(user.uid, data);
    loadedProfiles.add(user.uid);
    localStorage.setItem(`GAMEVAULT_PROFILE_${user.uid}`, JSON.stringify(data));
    if (remoteProfiles) {
        try {
            await remoteProfiles.child(user.uid).set(data);
        } catch (error) {
            console.error("Could not save user profile to Firebase", error);
        }
    }
}

async function addPurchasedUC(account) {
    const details = getUCDetails(account);
    const user = auth?.currentUser;
    if (!details || !user) return;
    const profile = getCachedUserProfile(user);
    const updated = { ...profile, ucBalance: Number(profile.ucBalance) || 0 };
    updated.ucBalance += details.total;
    await saveUserProfile(user, updated);
    updateAuthUI(user);
}

async function loadUserProfile(user) {
    if (!user || !remoteProfiles || loadedProfiles.has(user.uid)) {
        return;
    }
    loadedProfiles.add(user.uid);
    try {
        const snapshot = await remoteProfiles.child(user.uid).once("value");
        if (snapshot.exists()) {
            const data = { ...getCachedUserProfile(user), ...snapshot.val() };
            profileCache.set(user.uid, data);
            localStorage.setItem(`GAMEVAULT_PROFILE_${user.uid}`, JSON.stringify(data));
            updateAuthUI(user);
        } else {
            await saveUserProfile(user);
        }
    } catch (error) {
        console.error("Could not load user profile", error);
    }
}

function updateAuthUI(user) {
    $("loginButton").classList.toggle("hidden", LOCAL_TEST_MODE || Boolean(user));
    $("registerButton").classList.toggle("hidden", LOCAL_TEST_MODE || Boolean(user));
    $("logoutButton").classList.toggle("hidden", !user);
    $("userProfile").classList.toggle("hidden", !user);
    const isAdmin = isAdminUser(user);
    $("adminDashboardButton").classList.toggle("hidden", !isAdmin);
    if (user) {
        const profile = getCachedUserProfile(user);
        const displayName = profile.name || user.displayName || getEmailDisplayName(user);
        const photoURL = profile.photoURL || getUserPhoto(user);
        $("userGreeting").textContent = displayName;
        $("userAvatar").classList.toggle("hidden", !photoURL);
        if (photoURL) {
            $("userAvatar").src = photoURL;
            $("userAvatar").alt = displayName;
        }
        const ucBalance = Number(profile.ucBalance) || 0;
        const userLevel = getUserLevel(ucBalance);
        $("userLevel").textContent = t("userLevel").replace("{level}", userLevel);
        $("userLevel").setAttribute("aria-label", t("userLevel").replace("{level}", userLevel));
        $("userUCBalance").textContent = t("ucBalance").replace("{count}", ucBalance);
        $("userUCBalance").classList.toggle("hidden", ucBalance <= 0);
        loadUserProfile(user);
    } else {
        $("userAvatar").classList.add("hidden");
        $("userLevel").textContent = "";
        $("userUCBalance").classList.add("hidden");
    }
    if (isAdmin && remoteProductCodes) {
        void loadAdminProductCodes(user);
    } else if (!LOCAL_TEST_MODE && adminProductCodesLoaded) {
        adminProductCodes = {};
        adminProductCodesLoaded = false;
        accounts = accounts.map(publicAccount);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(publicAccounts(accounts)));
        $("accountAccessCode").value = "";
        $("accountAccessCodeEnabled").checked = false;
        renderAccounts();
    }
}

if (auth) {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(error => {
        console.error("Firebase persistence failed", error);
    });
    auth.onAuthStateChanged(async user => {
        if (user && !user.emailVerified && !registrationInProgress) {
            await auth.signOut();
            openAuth("login");
            $("authMessage").textContent = t("emailNotVerified");
            $("resendVerification").classList.remove("hidden");
            updateVerificationCooldown(user.email);
            return;
        }
        updateAuthUI(user);
    });
}

$("loginButton").addEventListener("click", () => openAuth("login"));
$("registerButton").addEventListener("click", () => openAuth("register"));
$("adminDashboardButton").addEventListener("click", openAdmin);
$("logoutButton").addEventListener("click", () => {
    if (auth) {
        auth.signOut();
    }
});

$("authSwitch").addEventListener("click", () => {
    openAuth(authMode === "login" ? "register" : "login");
});

$("passwordToggle").addEventListener("click", () => {
    const password = $("authPassword");
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    $("passwordToggle").setAttribute("aria-pressed", String(!isVisible));
    $("passwordToggle").setAttribute("aria-label", isVisible ? t("showPassword") : t("hidePassword"));
});

$("authPasswordConfirmToggle").addEventListener("click", () => {
    const password = $("authPasswordConfirm");
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    $("authPasswordConfirmToggle").setAttribute("aria-pressed", String(!isVisible));
    $("authPasswordConfirmToggle").setAttribute("aria-label", t(isVisible ? "showPassword" : "hidePassword"));
});

$("gameAccountPasswordToggle").addEventListener("click", () => {
    const password = $("gameAccountPassword");
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    $("gameAccountPasswordToggle").setAttribute("aria-pressed", String(!isVisible));
    $("gameAccountPasswordToggle").setAttribute("aria-label", t(isVisible ? "showPassword" : "hidePassword"));
});

function resizeImageToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const image = new Image();
            image.onload = () => {
                const size = 256;
                const scale = Math.min(size / image.width, size / image.height, 1);
                const canvas = document.createElement("canvas");
                canvas.width = Math.max(1, Math.round(image.width * scale));
                canvas.height = Math.max(1, Math.round(image.height * scale));
                canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg", 0.8));
            };
            image.onerror = reject;
            image.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

$("authPhoto").addEventListener("change", async event => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    try {
        selectedAuthImage = await resizeImageToDataUrl(file);
        $("authPhotoPreview").src = selectedAuthImage;
        $("authPhotoPreview").classList.remove("hidden");
    } catch {
        selectedAuthImage = "";
        $("authMessage").textContent = t("invalidPhoto");
    }
});

$("forgotPassword").addEventListener("click", async () => {
    if (!auth) {
        $("authMessage").textContent = t("firebaseConfig");
        return;
    }

    const email = $("authEmail").value.trim();
    if (!email) {
        $("authMessage").textContent = t("enterEmail");
        $("authEmail").focus();
        return;
    }

    try {
        await auth.sendPasswordResetEmail(email, AUTH_ACTION_SETTINGS);
        $("authMessage").textContent = t("resetSent");
    } catch (error) {
        $("authMessage").textContent = authErrorMessage(error);
    }
});

$("resendVerification").addEventListener("click", async () => {
    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;
    const expiresAt = Number(localStorage.getItem(verificationCooldownKey(email.toLowerCase())) || 0);

    if (expiresAt > Date.now()) {
        updateVerificationCooldown(email);
        return;
    }
    if (!isValidEmail(email) || !password) {
        $("authMessage").textContent = t("enterEmail");
        return;
    }

    try {
        registrationInProgress = true;
        const result = await auth.signInWithEmailAndPassword(email, password);
        try {
            await result.user.sendEmailVerification(AUTH_ACTION_SETTINGS);
        } finally {
            await auth.signOut();
        }
        startVerificationCooldown(email);
        $("authMessage").textContent = t("verificationSent");
    } catch (error) {
        $("authMessage").textContent = authErrorMessage(error);
    } finally {
        registrationInProgress = false;
    }
});

$("authForm").addEventListener("submit", async event => {
    event.preventDefault();

    if (!auth) {
        $("authMessage").textContent = t("firebaseConfig");
        return;
    }

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;
    const passwordConfirm = $("authPasswordConfirm").value;
    const name = $("authName").value.trim();

    if (!isValidEmail(email)) {
        $("authMessage").textContent = t("invalidEmail");
        $("authEmail").focus();
        return;
    }

    if (isDisposableEmail(email)) {
        $("authMessage").textContent = t("disposableEmail");
        $("authEmail").focus();
        return;
    }

    if (authMode === "register" && password !== passwordConfirm) {
        $("authMessage").textContent = t("passwordsDoNotMatch");
        $("authPasswordConfirm").focus();
        return;
    }

    let createdUser = null;
    try {
        if (authMode === "register") {
            registrationInProgress = true;
            const result = await auth.createUserWithEmailAndPassword(email, password);
            createdUser = result.user;
            const profile = {};
            if (name) {
                profile.displayName = name;
            }
            if (Object.keys(profile).length) {
                await result.user.updateProfile(profile);
            }
            await saveUserProfile(result.user, {
                name,
                photoURL: selectedAuthImage
            });
            await result.user.reload();
            await result.user.sendEmailVerification(AUTH_ACTION_SETTINGS);
            startVerificationCooldown(email);
            await auth.signOut();
            event.target.reset();
            closeModal("authModal");
            alert(t("verifyEmailSent"));
            return;
        } else {
            await auth.signInWithEmailAndPassword(email, password);
            if (!auth.currentUser.emailVerified) {
                await auth.signOut();
                $("authMessage").textContent = t("emailNotVerified");
                return;
            }
            updateAuthUI(auth.currentUser);
        }

        event.target.reset();
        closeModal("authModal");
    } catch (error) {
        if (error.code === "auth/email-already-in-use" && authMode === "register") {
            openAuth("login");
            $("authEmail").value = email;
            $("authMessage").textContent = t("emailExistsLogin");
            return;
        }
        if (createdUser) {
            if (auth.currentUser?.uid === createdUser.uid) {
                await auth.signOut().catch(signOutError => {
                    console.error("Could not sign out after verification email failure", signOutError);
                });
            }
            $("resendVerification").classList.remove("hidden");
            updateVerificationCooldown(email);
        }
        $("authMessage").textContent = authErrorMessage(error);
    } finally {
        registrationInProgress = false;
    }
});

function formatPrice(price, currency) {
    const supportedCurrency = Object.values(COUNTRY_CURRENCIES).includes(currency)
        ? currency
        : COUNTRY_CURRENCIES.QA;
    try {
        return new Intl.NumberFormat(currentLanguage, {
            style: "currency",
            currency: supportedCurrency,
            maximumFractionDigits: 2
        }).format(Number(price) || 0);
    } catch {
        return `${Number(price) || 0} ${supportedCurrency}`;
    }
}

function escapeHTML(text) {
    return String(text || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getProductIcon(type) {

    if (type === "UC") {
        return "";
    }

    if (type === "Royale Pass") {
        return "";
    }
    return "";
}

function renderAccounts() {
    const container = $("accountsContainer");
    const search = $("searchInput").value.trim().toLowerCase();
    const country = $("countryFilter")?.value || "all";
    const activeTypeButton = document.querySelector(".product-filter.active");
    const selectedType = activeTypeButton ? activeTypeButton.dataset.type : "all";

    const filteredAccounts = accounts.filter(account => {
        const accountCountry = countryCode(account.country).toUpperCase();
        const countryMatches = COUNTRY_CODES.includes(accountCountry) &&
            (country === "all" || accountCountry === country);
        const typeMatches = selectedType === "all" || account.type === selectedType;
        const translatedText = Object.values(account.translations || {})
            .map(values => Object.values(values || {}).join(" "))
            .join(" ");
        const searchableText = [
            account.name,
            account.nameEn,
            account.description,
            account.descriptionEn,
            account.price,
            account.type === "UC" ? ucSummary(account) : account.quantity,
            account.quantityEn,
            translatedText,
            countryName(account.country),
            account.type
        ].join(" ").toLowerCase();

        return countryMatches && typeMatches && (!search || searchableText.includes(search));
    });

    $("accountCount").textContent = t("productCount").replace("{count}", filteredAccounts.length);

    if (filteredAccounts.length === 0) {
        container.innerHTML = "";
        $("emptyMessage").classList.remove("hidden");
        return;
    }

    $("emptyMessage").classList.add("hidden");
    container.innerHTML = filteredAccounts.map(createAccountCard).join("");
}


/* ==================================================
   إنشاء بطاقة المنتج
================================================== */

function createAccountCard(account) {

    const image =
        account.images
        &&
        account.images.length
            ? account.images[0]
            : null;

    const isUCProduct = account.type === "UC";
    const isRoyalePassProduct = account.type === "Royale Pass";

    const icon =
        getProductIcon(
            account.type
        );

    return `

        <article class="account-card">


            <div
                class="account-image"
                ${
                    !isUCProduct && image
                    ?
                    `onclick="showDetails('${account.id}')"
                     style="cursor:pointer;"`
                    :
                    ""
                }
            >


                ${
                    isUCProduct

                    ?

                    `<div class="uc-product-visual">${ucProductVisual(account)}</div>`

                    : isRoyalePassProduct

                    ?

                    `<div class="royale-pass-visual">${royalePassVisual(account)}</div>`

                    : !isUCProduct && image

                    ?

                    `
                    <img
                        id="card-image-${account.id}"
                        src="${image}"
                        alt="${escapeHTML(localizedProductText(account.name, account.nameEn, account.translations, "name"))}"
                        onclick="openAccountImageViewer(event, '${account.id}', 0)"
                    >
                    ${account.images.length > 1 ? `
                        <div class="image-slider-controls">
                            <button type="button" aria-label="${t("previousImage")}" onclick="changeCardImage(event, '${account.id}', -1)">→</button>
                            <span id="card-image-count-${account.id}">1 / ${account.images.length}</span>
                            <button type="button" aria-label="${t("nextImage")}" onclick="changeCardImage(event, '${account.id}', 1)">←</button>
                        </div>
                    ` : ""}
                    `

                    :

                    `
                    <div class="no-image">
                        ${icon}
                        <br>
                        ${t("noImage")}
                    </div>
                    `
                }


                <span class="product-type">

                    ${icon}
                    ${escapeHTML(typeLabel(account.type))}

                </span>


                <span class="country-badge">

                    ${escapeHTML(countryLabel(account.country))}

                </span>


            </div>


            <div class="account-body">


                <div class="account-top">

                    <h3>
                        ${escapeHTML(localizedProductText(account.name, account.nameEn, account.translations, "name"))}
                    </h3>

                    <span class="price">

                        ${formatPrice(
                            account.price,
                            currencyForCountry(account.country)
                        )}

                    </span>

                </div>


                ${
                    account.quantity
                    ?
                    `
                    <span class="quantity">
                        ${escapeHTML(localizedProductQuantity(account))}
                    </span>
                    `
                    :
                    ""
                }


                ${stockSummary(account) ? `<p class="stock-status${isOutOfStock(account) ? " sold-out" : ""}">${escapeHTML(stockSummary(account))}</p>` : ""}

                <p class="account-description">

                    ${escapeHTML(
                        localizedProductText(account.description, account.descriptionEn, account.translations, "description")
                        ||
                        t("noDescription")
                    )}

                </p>


                <div class="card-buttons">

                    <button
                        onclick="showDetails('${account.id}')"
                    >
                        ${t("details")}
                    </button>


                    <button
                        class="buy"
                        ${isOutOfStock(account) ? "disabled" : ""}
                        onclick="openBuy('${account.id}')"
                    >
                        ${t("buy")}
                    </button>

                </div>

            </div>

        </article>

    `;

}


function changeCardImage(event, id, direction) {

    event.stopPropagation();

    const account = accounts.find(item => item.id === id);

    if (!account || !account.images || account.images.length < 2) {
        return;
    }

    const image = document.getElementById(`card-image-${id}`);
    const counter = document.getElementById(`card-image-count-${id}`);
    const currentIndex = Number(image.dataset.index || 0);
    const nextIndex = (currentIndex + direction + account.images.length) % account.images.length;

    image.src = account.images[nextIndex];
    image.dataset.index = nextIndex;

    if (counter) {
        counter.textContent = `${nextIndex + 1} / ${account.images.length}`;
    }

}


/* ==================================================
   تفاصيل المنتج
================================================== */

function showDetails(id) {

    const account =
        accounts.find(
            a => a.id === id
        );


    if (!account) {
        return;
    }

    currentAccount = account;


    const images =
        account.images || [];


    const firstImage =
        account.type !== "UC" && images.length
            ? images[0]
            : null;


        $("detailsContent").innerHTML = `
            <h2>
                ${getProductIcon(account.type)}
                ${escapeHTML(localizedProductText(account.name, account.nameEn, account.translations, "name"))}
            </h2>
            <p class="muted">
                ${t("type")}:
                ${escapeHTML(typeLabel(account.type))}
                <br>
                ${t("country")}:
                ${escapeHTML(countryLabel(account.country))}
            </p>
            ${
                (account.type === "UC" ? ucSummary(account) : account.quantity)
                ?
                `
                <p
                    style="
                        color:#43a8ff;
                        margin-top:10px;
                        font-weight:bold;
                    "
                >
                    ${escapeHTML(localizedProductQuantity(account))}
                </p>
                `
                :
                ""
            }
            ${stockSummary(account) ? `<p class="stock-status${isOutOfStock(account) ? " sold-out" : ""}">${escapeHTML(stockSummary(account))}</p>` : ""}
            <h3
                style="
                    color:#53df91;
                    margin:15px 0;
                "
            >
                ${formatPrice(
                    account.price,
                    currencyForCountry(account.country)
                )}
            </h3>
            ${
                firstImage && account.type !== "Royale Pass"
                ?
                `
                <img
                    id="mainDetailsImage"
                    src="${firstImage}"
                    style="
                        width:100%;
                        height:350px;
                        object-fit:cover;
                        border-radius:15px;
                        cursor:pointer;
                    "
                    onclick="openAccountImageViewer(event, '${account.id}', 0)"
                >
                `
                :
                `
                ${account.type === "UC"
                    ? `<div class="uc-product-visual" style="height:350px">${ucProductVisual(account)}</div>`
                    : account.type === "Royale Pass"
                    ? `<div class="royale-pass-visual details-royale-pass-visual">${royalePassVisual(account)}</div>`
                    : `<div class="no-image" style="height:350px">${t("noImage")}</div>`}
                `
            }
            ${
                images.length > 1 && account.type !== "Royale Pass"
                ?
                `
                <div class="details-slider-controls">
                    <button type="button" aria-label="${t("previousImage")}" onclick="changeDetailsImage(-1)">→</button>
                    <span id="detailsImageCounter">1 / ${images.length}</span>
                    <button type="button" aria-label="${t("nextImage")}" onclick="changeDetailsImage(1)">←</button>
                </div>
                `
                :
                ""
            }
            ${
                images.length && account.type !== "Royale Pass"
                ?
                `
                <div
                    style="
                        display:grid;
                        grid-template-columns:
                        repeat(5,1fr);
                        gap:7px;
                        margin-top:10px;
                    "
                >
                    ${images
                        .slice(0,10)
                        .map(
                            image => `
                            <button
                                onclick="
                                    changeMainImage('${image}')
                                "
                                style="
                                    height:65px;
                                    padding:0;
                                    overflow:hidden;
                                    border-radius:8px;
                                    border:1px solid #25364d;
                                    background:#071322;
                                    cursor:pointer;
                                "
                            >
                                <img
                                    src="${image}"
                                    style="
                                        width:100%;
                                        height:100%;
                                        object-fit:cover;
                                    "
                                >
                            </button>
                            `
                        )
                        .join("")
                    }
                </div>
                `
                :
                ""
            }
            <p
                style="
                    color:#8493a8;
                    line-height:2;
                    white-space:pre-line;
                    margin-top:20px;
                "
            >
                ${escapeHTML(
                    localizedProductText(account.description, account.descriptionEn, account.translations, "description")
                    ||
                    t("noDescription")
                )}
            </p>
            <button
                class="main-button full"
                ${isOutOfStock(account) ? "disabled" : ""}
                onclick="
                    closeModal('detailsModal');
                    openBuy('${account.id}');
                "
            >
                ${t("buy")}
            </button>
        `;

        /*
        <p class="muted">

            النوع:
            ${escapeHTML(account.type)}

            <br>

            الدولة:
            ${escapeHTML(account.country)}

        </p>


        ${
            account.quantity
            ?
            `
            <p
                style="
                    color:#43a8ff;
                    margin-top:10px;
                    font-weight:bold;
                "
            >
                ${escapeHTML(account.quantity)}
            </p>
            `
            :
            ""
        }


        <h3
            style="
                color:#53df91;
                margin:15px 0;
            "
        >

            ${formatPrice(
                account.price,
                currencyForCountry(account.country)
            )}

        </h3>


        ${
            firstImage

            ?

            `
            <img
                id="mainDetailsImage"
                src="${firstImage}"
                style="
                    width:100%;
                    height:350px;
                    object-fit:cover;
                    border-radius:15px;
                    cursor:pointer;
                "
                onclick="openAccountImageViewer(event, '${account.id}', 0)"
            >
            `

            :

            `
            <div
                class="no-image"
                style="height:350px"
            >
                ${t("noImage")}
            </div>
            `
        }


        ${
            images.length

            ?

            `
            <div
                style="
                    display:grid;
                    grid-template-columns:
                    repeat(5,1fr);
                    gap:7px;
                    margin-top:10px;
                "
            >

                ${images
                    .slice(0,10)
                    .map(
                        image => `

                        <button
                            onclick="
                                changeMainImage('${image}')
                            "
                            style="
                                height:65px;
                                padding:0;
                                overflow:hidden;
                                border-radius:8px;
                                border:1px solid #25364d;
                                background:#071322;
                                cursor:pointer;
                            "
                        >

                            <img
                                src="${image}"
                                style="
                                    width:100%;
                                    height:100%;
                                    object-fit:cover;
                                "
                            >

                        </button>

                        `
                    )
                    .join("")
                }

            </div>
            `

            :

            ""
        }


        <p
            style="
                color:#8493a8;
                line-height:2;
                white-space:pre-line;
                margin-top:20px;
            "
        >

            ${escapeHTML(
                account.description
                ||
                t("noDescription")
            )}

        </p>


        <button
            class="main-button full"
            onclick="
                closeModal('detailsModal');
                openBuy('${account.id}');
            "
        >

            ${t("buy")}

        </button>

    `;


        */

    openModal("detailsModal");

}


/* ==================================================
   تغيير الصورة
================================================== */

function changeMainImage(image) {

    const main = $("mainDetailsImage");

    if (main) {
        main.src = image;
        main.dataset.index = currentAccount.images.indexOf(image);
    }

}


function changeDetailsImage(direction) {

    if (!currentAccount || !currentAccount.images || currentAccount.images.length < 2) {
        return;
    }

    const image = $("mainDetailsImage");
    const counter = $("detailsImageCounter");
    const currentIndex = Number(image.dataset.index || 0);
    const nextIndex =
        (currentIndex + direction + currentAccount.images.length)
        % currentAccount.images.length;

    image.src = currentAccount.images[nextIndex];
    image.dataset.index = nextIndex;
    image.classList.remove("details-image-changing");
    void image.offsetWidth;
    image.classList.add("details-image-changing");

    if (counter) {
        counter.textContent = `${nextIndex + 1} / ${currentAccount.images.length}`;
    }

}

function openAccountImageViewer(event, id, startIndex) {

    if (event) {
        event.stopPropagation();
    }

    const account =
        accounts.find(
            item => item.id === id
        );

    if (!account || !account.images || !account.images.length) {
        return;
    }

    let currentIndex = startIndex;

    const viewer =
        document.createElement("div");

    const img =
        document.createElement("img");

    const counter =
        document.createElement("span");

    const updateViewer = () => {
        img.src = account.images[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${account.images.length}`;
    };

    const moveImage = direction => {
        currentIndex =
            (currentIndex + direction + account.images.length)
            % account.images.length;
        updateViewer();
    };

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "viewer-arrow viewer-previous";
    previous.textContent = "→";
    previous.setAttribute("aria-label", t("previousImage"));
    previous.addEventListener("click", event => {
        event.stopPropagation();
        moveImage(-1);
    });

    const next = document.createElement("button");
    next.type = "button";
    next.className = "viewer-arrow viewer-next";
    next.textContent = "←";
    next.setAttribute("aria-label", t("nextImage"));
    next.addEventListener("click", event => {
        event.stopPropagation();
        moveImage(1);
    });

    const close = document.createElement("button");
    close.type = "button";
    close.className = "viewer-close";
    close.textContent = "×";
    close.setAttribute("aria-label", t("closeImages"));

    const closeViewer = () => {
        document.removeEventListener("keydown", handleKeydown);
        viewer.remove();
    };

    const handleKeydown = keyboardEvent => {
        if (keyboardEvent.key === "Escape") {
            closeViewer();
        } else if (keyboardEvent.key === "ArrowLeft") {
            moveImage(-1);
        } else if (keyboardEvent.key === "ArrowRight") {
            moveImage(1);
        }
    };

    close.addEventListener("click", closeViewer);

    viewer.className = "image-viewer";
    viewer.addEventListener("click", closeViewer);

    const frame = document.createElement("div");
    frame.className = "image-viewer-frame";
    frame.addEventListener("click", event => event.stopPropagation());

    const controls = document.createElement("div");
    controls.className = "image-viewer-controls";
    controls.append(previous, counter, next);

    frame.append(close, img, controls);
    viewer.appendChild(frame);
    document.body.appendChild(viewer);

    updateViewer();
    document.addEventListener("keydown", handleKeydown);

}


/* ==================================================
   فتح الشراء
================================================== */

function openBuy(id, resetForm = true) {

    const account =
        accounts.find(
            a => a.id === id
        );


    if (!account) {
        return;
    }

    if (isOutOfStock(account)) {
        alert(t("outOfStock"));
        return;
    }


    currentAccount = account;

    if (resetForm) {
        $("buyForm").reset();
        $("checkoutStatus").textContent = "";
        const needsPlayerId = account.type === "UC" || account.type === "Royale Pass";
        $("pubgPlayerIdGroup").classList.toggle("hidden", !needsPlayerId);
        $("pubgPlayerId").disabled = !needsPlayerId;
        $("pubgPlayerId").value = "";
    }

    $("buyInfo").innerHTML = `

        <div
            style="
                background:#071322;
                padding:15px;
                border-radius:12px;
                margin:15px 0;
            "
        >

            <strong>

                ${getProductIcon(account.type)}

                ${escapeHTML(localizedProductText(account.name, account.nameEn, account.translations, "name"))}

            </strong>

            <br>

            <span class="muted">

                ${escapeHTML(typeLabel(account.type))}

                •
                ${escapeHTML(countryLabel(account.country))}

            </span>

            ${
                (account.type === "UC" ? ucSummary(account) : account.quantity)
                ?
                `
                <br>
                <span
                    style="color:#43a8ff"
                >
                    ${escapeHTML(localizedProductQuantity(account))}
                </span>
                `
                :
                ""
            }

            <br>

            <strong
                style="color:#53df91"
            >

                ${formatPrice(
                    account.price,
                    currencyForCountry(account.country)
                )}

            </strong>

            ${stockSummary(account) ? `<br><span class="stock-status${isOutOfStock(account) ? " sold-out" : ""}">${escapeHTML(stockSummary(account))}</span>` : ""}

        </div>

        <div style="margin-top:12px; padding:12px 14px; border:1px solid rgba(83,223,145,.25); border-radius:12px; background:rgba(83,223,145,.06); color:#dff9eb; font-size:13px; line-height:1.7;">
            <strong style="display:block; margin-bottom:6px; color:#53df91;">طلب عبر واتساب</strong>
            اكتب الكود الذي يخص هذا المنتج فقط، ثم اضغط <strong>إظهار الحساب</strong> للحصول على بيانات الحساب.
            <br>
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`السلام عليكم، أريد شراء ${localizedProductText(account.name, account.nameEn, account.translations, "name")}.`) }" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-top:10px; color:#4dd9ff; font-weight:bold; text-decoration:none;">
                إرسال طلب عبر واتساب
            </a>
        </div>

    `;

    const submitButton = $("submitBuyButton");
    if (submitButton) {
        submitButton.querySelector("span").textContent = "إظهار الحساب";
    }

    openModal("buyModal");

}


/* ==================================================
   البحث
================================================== */

$("searchButton")
    .addEventListener(
        "click",
        function() {

            const value =
                $("searchInput")
                    .value
                    .trim();


            renderAccounts();

        }
    );


$("searchInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                $("searchButton").click();

            }

        }
    );


$("searchInput")
    .addEventListener(
        "input",
        renderAccounts
    );


/* ==================================================
   فلترة الدول
================================================== */

$("countryDropdownToggle").addEventListener("click", () => {
    const dropdown = $("countryDropdown");
    const willOpen = dropdown.classList.contains("hidden");
    dropdown.classList.toggle("hidden", !willOpen);
    $("countryDropdownToggle").setAttribute("aria-expanded", String(willOpen));
    if (willOpen) {
        populateCountryOptions();
        $("countrySearch").focus();
    }
});

$("countrySearch").addEventListener("input", () => {
    populateCountryOptions();
});

function bindAdminSearchPicker(config) {
    const toggle = $(config.toggleId);
    const dropdown = $(config.dropdownId);
    const search = $(config.searchId);
    const options = $(config.optionsId);
    const selectedInput = $(config.valueId);

    toggle.addEventListener("click", () => {
        const willOpen = dropdown.classList.contains("hidden");
        dropdown.classList.toggle("hidden", !willOpen);
        toggle.setAttribute("aria-expanded", String(willOpen));
        if (willOpen) {
            config.populate();
            search.focus();
        }
    });

    search.addEventListener("input", config.populate);
    options.addEventListener("click", event => {
        const option = event.target.closest("[data-value]");
        if (!option) return;
        selectedInput.value = option.dataset.value;
        selectedInput.dataset[config.dataKey] = option.dataset.value;
        search.value = "";
        config.populate();
        dropdown.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
    });

    search.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            dropdown.classList.add("hidden");
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            options.querySelector("[data-value]")?.focus();
        }
    });

    options.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            dropdown.classList.add("hidden");
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const items = [...options.querySelectorAll("[data-value]")];
            const currentIndex = items.indexOf(event.target);
            const step = event.key === "ArrowDown" ? 1 : -1;
            items[(currentIndex + step + items.length) % items.length]?.focus();
        }
    });
}

bindAdminSearchPicker({
    toggleId: "accountCountryToggle",
    dropdownId: "accountCountryDropdown",
    searchId: "accountCountrySearch",
    optionsId: "accountCountryOptions",
    valueId: "accountCountry",
    dataKey: "selectedCountry",
    populate: populateCountryOptions
});

$("countryOptions").addEventListener("click", event => {
    const option = event.target.closest("[data-country]");
    if (!option) return;
    $("countryFilter").value = option.dataset.country;
    $("countrySearch").value = "";
    populateCountryOptions();
    $("countryDropdown").classList.add("hidden");
    $("countryDropdownToggle").setAttribute("aria-expanded", "false");
    renderAccounts();
});

$("countrySearch").addEventListener("keydown", event => {
    if (event.key === "Escape") {
        $("countryDropdown").classList.add("hidden");
        $("countryDropdownToggle").setAttribute("aria-expanded", "false");
        $("countryDropdownToggle").focus();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        $("countryOptions").querySelector("[data-country]")?.focus();
    }
});

$("countryOptions").addEventListener("keydown", event => {
    if (event.key === "Escape") {
        $("countryDropdown").classList.add("hidden");
        $("countryDropdownToggle").setAttribute("aria-expanded", "false");
        $("countryDropdownToggle").focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const options = [...$("countryOptions").querySelectorAll("[data-country]")];
        const currentIndex = options.indexOf(event.target);
        const step = event.key === "ArrowDown" ? 1 : -1;
        options[(currentIndex + step + options.length) % options.length]?.focus();
    }
});

document.addEventListener("click", event => {
    if (!event.target.closest("#storeCountryPicker")) {
        $("countryDropdown").classList.add("hidden");
        $("countryDropdownToggle").setAttribute("aria-expanded", "false");
    }
    document.querySelectorAll(".admin-choice-picker").forEach(picker => {
        if (picker.contains(event.target)) return;
        const dropdown = picker.querySelector(".country-dropdown");
        const toggle = picker.querySelector(".country-select-button");
        dropdown.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
    });
});

$("languageToggle").addEventListener("change", event => {
    currentLanguage = SUPPORTED_LANGUAGES.includes(event.currentTarget.value)
        ? event.currentTarget.value
        : "ar";
    localStorage.setItem("GAMEVAULT_LANGUAGE", currentLanguage);
    applyTranslations();
    translateProductsForLanguage(currentLanguage);
});


/* ==================================================
   فلترة أنواع المنتجات
================================================== */

document
    .querySelectorAll(".product-filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".product-filter"
                    )
                    .forEach(
                        b =>
                            b.classList
                                .remove("active")
                    );


                this.classList
                    .add("active");


                renderAccounts();

            }
        );

    });

$("accountType").addEventListener("change", updateProductTypeVisibility);
updateProductTypeVisibility();


/* ==================================================
   لوحة الإدارة
================================================== */

async function openAdmin() {

    if (LOCAL_TEST_MODE) {
        renderAdmin();
        openModal("adminModal");
        return;
    }

    const user = auth?.currentUser;
    if (!user || !user.emailVerified) {
        openAuth("login");
        return;
    }

    if (user.email?.trim().toLowerCase() !== ADMIN_EMAIL) {
        alert(t("adminAccessDenied"));
        return;
    }

    if (!await loadAdminProductCodes(user)) return;

    renderAdmin();
    openModal("adminModal");

}


/* ==================================================
   الصور
================================================== */

$("accountImages")
    .addEventListener(
        "change",
        async function() {

            const files =
                Array.from(
                    this.files
                ).slice(0,10);


            selectedImages =
                await Promise.all(
                    files.map(
                        fileToBase64
                    )
                );


            previewImages();

        }
    );


function fileToBase64(file) {

    return new Promise(
        resolve => {

            const reader =
                new FileReader();


            reader.onload =
                () =>
                    resolve(
                        reader.result
                    );


            reader.readAsDataURL(file);

        }
    );

}


function previewImages() {

    $("imagePreview")
        .innerHTML =
        selectedImages
            .map(
                image => `

                    <img
                        src="${image}"
                    >

                `
            )
            .join("");

}


/* ==================================================
   إضافة / تعديل المنتج
================================================== */

$("accountForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const editId =
                $("editId").value;
            const oldAccount = editId
                ? accounts.find(account => String(account.id) === String(editId))
                : null;

            const translations = Object.fromEntries(
                Object.entries(savedProductTranslations)
                    .map(([locale, values]) => [locale, { ...values }])
            );
            const arabicProduct = {
                name: $("accountName").value.trim(),
                description: $("accountDescription").value.trim()
            };

            const translationTargets = Object.fromEntries(
                SUPPORTED_LANGUAGES
                    .filter(locale => locale !== "ar")
                    .map(locale => {
                        const localeValues = typeof translations[locale] === "string"
                            ? { name: translations[locale] }
                            : translations[locale] || {};
                        const missingFields = Object.keys(arabicProduct).filter(field =>
                            arabicProduct[field] && !String(localeValues[field] || "").trim()
                        );
                        return [locale, missingFields];
                    })
                    .filter(([, fields]) => fields.length)
            );

            if (Object.keys(translationTargets).length) {
                const submitButton = event.submitter || $("accountForm").querySelector('[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = t("translationProgress");

                try {
                    const result = await translateProductFields(arabicProduct, translationTargets);
                    for (const [locale, values] of Object.entries(result)) {
                        translations[locale] = {
                            ...(typeof translations[locale] === "string" ? { name: translations[locale] } : translations[locale] || {}),
                            ...values
                        };
                    }
                } catch (error) {
                    console.warn("Automatic product translation unavailable; saving the original text.", error);
                }

                submitButton.disabled = false;
                submitButton.textContent = t("saveProduct");
            }

            translations.ar = { ...(translations.ar || {}), ...arabicProduct };
            const englishProduct = translations.en || {};
            const productType = $("accountType").value;
            const productName = arabicProduct.name;
            const inferredUCQuantity = productName.match(/\d[\d,]*/)?.[0];
            const productQuantity = oldAccount?.quantity
                || (productType === "UC" && inferredUCQuantity ? `${inferredUCQuantity} UC` : "");


            const account = {

                id:
                    editId
                    ||
                    createID(),


                type: productType,


                name: arabicProduct.name || "",

                nameEn: englishProduct.name || "",


                country:
                    $("accountCountry").dataset.selectedCountry || $("accountCountry").value,


                price:
                    Number(
                        $("accountPrice")
                            .value
                    ),


                currency: currencyForCountry($("accountCountry").dataset.selectedCountry || $("accountCountry").value),


                quantity: productQuantity,

                quantityEn: oldAccount?.quantityEn || englishProduct.quantity || "",


                description: arabicProduct.description || "",

                descriptionEn: englishProduct.description || "",

                accessCode: $("accountAccessCode").value.trim(),
                accessCodeEnabled: Boolean($("accountAccessCode").value.trim()) && $("accountAccessCodeEnabled").checked,

                stock: normalizeStock($("accountStock").value),

                translations,

                images:
                    selectedImages

            };


            if (editId) {

                const old =
                    accounts.find(
                        a => String(a.id) === String(editId)
                    );


                if (
                    selectedImages.length === 0
                    &&
                    old
                ) {

                    account.images =
                        old.images || [];

                }


                accounts =
                    accounts.map(
                        a =>
                            String(a.id) === String(editId)
                                ? account
                                : a
                    );

            }

            else {

                accounts.unshift(
                    account
                );

            }


            if (!await saveAccounts()) return;

            renderAccounts();

            renderAdmin();

            resetForm();


            alert(t("saveProductSuccess"));

        }
    );


/* ==================================================
   لوحة المنتجات
================================================== */

function renderAdmin() {

    const container =
        $("adminAccounts");
    renderAdminOrders();

    container.onclick = event => {
        const button = event.target.closest("[data-admin-action]");
        if (!button || !container.contains(button)) return;

        if (button.dataset.adminAction === "edit") {
            editAccount(button.dataset.accountId);
        } else if (button.dataset.adminAction === "delete") {
            deleteAccount(button.dataset.accountId);
        }
    };


    if (accounts.length === 0) {

        container.innerHTML = `

            <p class="muted">
                ${t("noAdminProducts")}
            </p>

        `;

        return;

    }


    container.innerHTML =
        accounts
            .map(
                account => `

                <div class="admin-account">

                    <div>

                        <strong>

                            ${getProductIcon(
                                account.type
                            )}

                            ${escapeHTML(
                                localizedProductText(account.name, account.nameEn, account.translations, "name")
                            )}

                        </strong>

                        <p>

                            ${escapeHTML(typeLabel(account.type))}

                            •
                            ${escapeHTML(
                                countryLabel(account.country)
                            )}

                            •
                            ${formatPrice(
                                account.price,
                                currencyForCountry(account.country)
                            )}

                            ${stockSummary(account) ? " • " + escapeHTML(stockSummary(account)) : ""}

                            ${account.accessCode ? " • كود: " + escapeHTML(account.accessCode) : ""}

                            •
                            ${(account.images || []).length}
                            ${t("imageCount")}

                        </p>

                    </div>

                    <span class="admin-code-status ${account.accessCodeEnabled ? "is-enabled" : "is-disabled"}" role="status">
                        <span class="admin-code-status-label">${escapeHTML(t("accessCodeStatus"))}</span>
                        <strong>${escapeHTML(account.accessCodeEnabled ? t("accessCodeEnabled") : t("accessCodeOff"))}</strong>
                    </span>

                    <div class="admin-actions">

                        <button type="button" data-admin-action="edit" data-account-id="${escapeHTML(account.id)}">
                            ${t("edit")}
                        </button>


                        <button type="button" class="delete" data-admin-action="delete" data-account-id="${escapeHTML(account.id)}">
                            ${t("delete")}
                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}

async function renderAdminOrders() {
    const container = $("adminOrders");
    if (!container) return;

    let orders = [];
    try {
        orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || "[]");
    } catch {
        orders = [];
    }

    if (!Array.isArray(orders) || orders.length === 0) {
        container.innerHTML = `<p class="muted">${t("noOrdersYet")}</p>`;
        return;
    }

    orders.sort((first, second) => Number(second.paidAt || second.createdAt || 0) - Number(first.paidAt || first.createdAt || 0));
    container.innerHTML = orders.map(order => `
        <div class="admin-account">
            <div>
                <strong>${escapeHTML(order.productName)} · ${escapeHTML(formatPrice(order.amount ?? order.price, order.currency))}</strong>
                <p>${t("orderEmail")}: ${escapeHTML(order.buyerEmail || order.email)}</p>
                ${order.playerId ? `<p>${t("playerIdLabel")}: ${escapeHTML(order.playerId)}</p>` : ""}
                ${order.status ? `<p>${t("orderStatus")}: ${escapeHTML(order.status)}</p>` : ""}
                <p>${t("orderTime")}: ${escapeHTML(new Date(order.createdAt).toLocaleString(currentLanguage))}</p>
            </div>
        </div>
    `).join("");
}


/* ==================================================
   تعديل المنتج
================================================== */

function editAccount(id) {

    const account =
        accounts.find(
            a => String(a.id) === String(id)
        );


    if (!account) {
        return;
    }

    savedProductTranslations = Object.fromEntries(
        Object.entries(account.translations || {}).map(([locale, values]) => [
            locale,
            typeof values === "string" ? { name: values } : { ...values }
        ])
    );


    $("editId").value =
        account.id;


    $("accountType").value =
        account.type || "حساب";

    $("accountName").value =
        account.name || "";

    $("accountStock").value = hasLimitedStock(account) ? account.stock : "";

    $("accountDescription").value =
        account.description || "";


    $("accountCountrySearch").value = "";
    $("accountCountry").dataset.selectedCountry = countryCode(account.country) || "QA";
    populateCountryOptions();


    $("accountPrice").value =
        account.price;

    $("accountAccessCode").value = account.accessCode || "";
    $("accountAccessCodeEnabled").checked = account.accessCodeEnabled === true;

    updateProductTypeVisibility();


    selectedImages = account.type === "حساب" ? account.images || [] : [];


    previewImages();


    $("accountName")
        .scrollIntoView({
            behavior:"smooth"
        });

}


/* ==================================================
   حذف المنتج
================================================== */

async function deleteAccount(id) {

    const account =
        accounts.find(
            a => String(a.id) === String(id)
        );


    if (!account) {
        return;
    }


    const yes =
        confirm(t("confirmDelete").replace("{name}", account.name));


    if (!yes) {
        return;
    }


    const remainingAccounts = accounts.filter(
        item => String(item.id) !== String(id)
    );

    try {
        if (remoteAccounts) await saveRemoteAccounts(remainingAccounts);
    } catch (error) {
        console.error("Product deletion failed", error);
        alert(t("saveFirebaseError"));
        return;
    }

    accounts = remainingAccounts;
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(LOCAL_TEST_MODE ? accounts : publicAccounts(accounts))
    );

    renderAccounts();

    renderAdmin();

}

function removePurchasedAccount(account) {
    if (!account || account.type !== "حساب") {
        return;
    }

    accounts = accounts.filter(item => item.id !== account.id);
    void saveAccounts();
    renderAccounts();
    renderAdmin();
}

function showDelivery(account, gameAccountEmail, gameAccountPassword, playerId = "") {
    currentDelivery = { account, gameAccountEmail, gameAccountPassword, playerId };
    const isAccount = account.type === "حساب";
    $("deliveryBadge").dataset.i18n = isAccount ? "deliveryBadge" : "localTestBadge";
    $("deliveryBadge").textContent = t(isAccount ? "deliveryBadge" : "localTestBadge");
    $("deliveryTitle").dataset.i18n = isAccount ? "deliveryTitle" : "localTestResult";
    $("deliveryTitle").textContent = t(isAccount ? "deliveryTitle" : "localTestResult");

    if (account.type === "حساب") {
        $("deliveryContent").innerHTML = `
            <p class="delivery-success">${t("accountReady")}</p>
            <div class="delivery-credentials">
                <div><span>${t("accountLogin")}</span><strong>${escapeHTML(gameAccountEmail)}</strong></div>
                <div><span>${t("accountPassword")}</span><strong>${escapeHTML(gameAccountPassword)}</strong></div>
            </div>
        `;
    } else {
        const playerIdRow = playerId
            ? `<div class="delivery-credentials"><div><span>${t("playerIdLabel")}</span><strong>${escapeHTML(playerId)}</strong></div></div>`
            : "";
        $("deliveryContent").innerHTML = `<p class="delivery-success">${t("deliveryCodeVerified")}</p>${playerIdRow}`;
    }
    openModal("deliveryModal");
}


/* ==================================================
   إعادة ضبط
================================================== */

function resetForm() {

    $("accountForm").reset();

    $("accountCountrySearch").value = "";
    $("accountCountry").dataset.selectedCountry = "QA";
    populateCountryOptions();

    savedProductTranslations = {};

    $("editId").value = "";

    selectedImages = [];

    $("imagePreview")
        .innerHTML = "";

    updateProductTypeVisibility();

}


/* ==================================================
   إتمام الاختبار المحلي
================================================== */

$("pubgPlayerId")?.addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, "").slice(0, 20);
});

$("buyForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            if (!currentAccount) {
                return;
            }

            const purchasedAccount = accounts.find(account => String(account.id) === String(currentAccount.id));
            if (!purchasedAccount) {
                $("checkoutStatus").textContent = t("accessCodeDisabled");
                return;
            }
            const buyerEmail = $("buyerEmail").value.trim();
            const productCode = $("productAccessCode").value.trim();
            const playerId = $("pubgPlayerId").value.trim();
            const needsPlayerId = purchasedAccount.type === "UC" || purchasedAccount.type === "Royale Pass";

            if (!buyerEmail) {
                $("checkoutStatus").textContent = "يرجى إدخال البريد الإلكتروني.";
                return;
            }

            if (!productCode) {
                $("checkoutStatus").textContent = "يرجى إدخال كود المنتج.";
                return;
            }

            if (LOCAL_TEST_MODE) {
                const savedCode = String(purchasedAccount.accessCode || "").trim();
                if (!purchasedAccount.accessCodeEnabled) {
                    $("checkoutStatus").textContent = t("accessCodeDisabled");
                    return;
                }
                if (!savedCode || productCode !== savedCode) {
                    $("checkoutStatus").textContent = t("accessCodeInvalid");
                    return;
                }
            } else {
                if (!CODE_VERIFICATION_URL) {
                    $("checkoutStatus").textContent = t("accessCodeVerificationUnavailable");
                    return;
                }
                const submitButton = $("submitBuyButton");
                const submitButtonLabel = submitButton.querySelector("span");
                submitButton.disabled = true;
                submitButtonLabel.textContent = t("verifyingCode");
                $("checkoutStatus").textContent = t("verifyingCode");
                try {
                    const response = await fetch(CODE_VERIFICATION_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ productId: purchasedAccount.id, code: productCode })
                    });
                    if (response.status === 429) {
                        $("checkoutStatus").textContent = t("accessCodeRateLimited");
                        return;
                    }
                    if (!response.ok) {
                        throw new Error(`Code verification service returned ${response.status}.`);
                    }
                    const result = await response.json();
                    if (!result.valid) {
                        $("checkoutStatus").textContent = result.disabled
                            ? t("accessCodeDisabled")
                            : t("accessCodeInvalid");
                        return;
                    }
                } catch (error) {
                    console.error("Product code verification failed", error);
                    $("checkoutStatus").textContent = error.code === "functions/resource-exhausted"
                        ? t("accessCodeRateLimited")
                        : t("accessCodeVerificationUnavailable");
                    return;
                } finally {
                    submitButton.disabled = false;
                    submitButtonLabel.textContent = "إظهار الحساب";
                }
            }

            if (isOutOfStock(purchasedAccount)) {
                alert(t("outOfStock"));
                closeModal("buyModal");
                renderAccounts();
                return;
            }

            const settings = loadSettings();
            const gameAccountEmail = settings.gameAccountEmail || (LOCAL_TEST_MODE ? "demo@gamevault.invalid" : "");
            const gameAccountPassword = settings.gameAccountPassword || (LOCAL_TEST_MODE ? "demo-only-password" : "");

            if (purchasedAccount.type === "حساب" && (!gameAccountEmail || !gameAccountPassword)) {
                alert(t("missingAccountCredentials"));
                closeModal("buyModal");
                return;
            }

            let orders = [];
            try {
                orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || "[]");
            } catch {
                orders = [];
            }
            orders.unshift({
                id: createID(),
                email: buyerEmail,
                playerId: needsPlayerId ? playerId : "",
                productId: purchasedAccount.id,
                productName: localizedProductText(purchasedAccount.name, purchasedAccount.nameEn, purchasedAccount.translations, "name"),
                price: purchasedAccount.price,
                currency: currencyForCountry(purchasedAccount.country),
                status: "تم إظهار الحساب عبر الكود",
                createdAt: new Date().toISOString()
            });
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
            const product = accounts.find(account => String(account.id) === String(purchasedAccount.id));
            if (product && hasLimitedStock(product)) {
                product.stock -= 1;
                void saveAccounts();
                renderAccounts();
                if (!$("adminModal").classList.contains("hidden")) renderAdmin();
            }
            if (purchasedAccount.type === "UC") await addPurchasedUC(purchasedAccount);
            closeModal("buyModal");
            this.reset();
            showDelivery(purchasedAccount, gameAccountEmail, gameAccountPassword, playerId);
        }
    );

/* ==================================================
   إغلاق النوافذ بالخارج
================================================== */

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === this
                ) {

                    closeModal(
                        this.id
                    );

                }

            }
        );

    });


/* ==================================================
   تشغيل الموقع
================================================== */

populateCountryOptions();
applyTranslations();
renderAccounts();