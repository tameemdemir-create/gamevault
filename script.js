/* ==================================================
   إعدادات الموقع
================================================== */

const ADMIN_CODE = "24680";

const STORAGE_KEY = "PUBG_MARKET_ACCOUNTS";

const WHATSAPP_NUMBER = "9620792077942";

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

let remoteAccounts = null;

if (firebaseReady) {
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        remoteAccounts = firebase.database().ref("products");
        auth = firebase.auth();
    } catch (error) {
        console.error("Firebase initialization failed", error);
    }
}

let currentAccount = null;
let selectedPayment = "بطاقة بنكية";
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
                    alert("تعذر رفع المنتجات الحالية إلى Firebase.");
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
            alert("تعذر حفظ البيانات على Firebase. تحقق من قواعد قاعدة البيانات.");
        });
    }
}

loadAccounts();

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
    $("authTitle").textContent = mode === "login" ? "تسجيل الدخول" : "إنشاء حساب";
    $("authNameGroup").classList.toggle("hidden", mode === "login");
    $("authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
    $("authSubmit").textContent = mode === "login" ? "تسجيل الدخول" : "إنشاء حساب";
    $("authSwitch").textContent = mode === "login" ? "ليس لديك حساب؟ إنشاء حساب" : "لديك حساب؟ تسجيل الدخول";
    $("authMessage").textContent = "";
    openModal("authModal");
}

function authErrorMessage(error) {
    const messages = {
        "auth/email-already-in-use": "هذا البريد مستخدم من قبل.",
        "auth/invalid-email": "البريد الإلكتروني غير صالح.",
        "auth/weak-password": "كلمة السر يجب أن تكون 6 أحرف على الأقل.",
        "auth/user-not-found": "لا يوجد حساب بهذا البريد.",
        "auth/wrong-password": "البريد أو كلمة السر غير صحيحة.",
        "auth/popup-closed-by-user": "تم إغلاق نافذة Google.",
        "auth/operation-not-allowed": "يجب تفعيل طريقة الدخول من Firebase.",
        "auth/unauthorized-domain": `النطاق غير مصرح به. أضف ${window.location.hostname} إلى Authorized domains في Firebase.`,
        "auth/invalid-api-key": "مفتاح Firebase غير صحيح.",
        "auth/network-request-failed": "تعذر الاتصال بالإنترنت، حاول مرة أخرى.",
        "auth/account-exists-with-different-credential": "هذا البريد مسجل بطريقة دخول أخرى. استخدم البريد وكلمة السر.",
        "auth/credential-already-in-use": "حساب Google مستخدم من قبل."
    };
    return messages[error.code] || `حدث خطأ (${error.code || "غير معروف"}).`;
}

function updateAuthUI(user) {
    $("loginButton").classList.toggle("hidden", Boolean(user));
    $("registerButton").classList.toggle("hidden", Boolean(user));
    $("logoutButton").classList.toggle("hidden", !user);
    $("userGreeting").classList.toggle("hidden", !user);
    if (user) {
        $("userGreeting").textContent = `مرحبًا ${user.displayName || user.email}`;
        closeModal("authModal");
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
            googleButton.innerHTML = '<span class="google-icon">G</span> المتابعة باستخدام Google';
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
    $("passwordToggle").setAttribute("aria-label", isVisible ? "إظهار كلمة السر" : "إخفاء كلمة السر");
});

$("googleLoginButton").addEventListener("click", async () => {
    if (!auth) {
        $("authMessage").textContent = "إعدادات Firebase غير مكتملة.";
        return;
    }

    if (window.top !== window.self) {
        $("authMessage").textContent = "افتح الرابط في Chrome أو Edge خارج معاينة VS Code.";
        return;
    }

    const googleButton = $("googleLoginButton");
    googleButton.disabled = true;
    googleButton.textContent = "جاري فتح تسجيل الدخول...";

    try {
        const result = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        updateAuthUI(result.user);
        closeModal("authModal");
    } catch (error) {
        if (error.code === "auth/popup-blocked") {
            try {
                await auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
                return;
            } catch (redirectError) {
                error = redirectError;
            }
        }

        $("authMessage").textContent = authErrorMessage(error);
    } finally {
        googleButton.disabled = false;
        googleButton.innerHTML = '<span class="google-icon">G</span> المتابعة باستخدام Google';
    }
});

$("authForm").addEventListener("submit", async event => {
    event.preventDefault();

    if (!auth) {
        $("authMessage").textContent = "إعدادات Firebase غير مكتملة.";
        return;
    }

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;
    const name = $("authName").value.trim();

    try {
        if (authMode === "register") {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            if (name) {
                await result.user.updateProfile({ displayName: name });
            }
        } else {
            await auth.signInWithEmailAndPassword(email, password);
        }

        event.target.reset();
        closeModal("authModal");
    } catch (error) {
        $("authMessage").textContent = authErrorMessage(error);
    }
});

function formatPrice(price, currency) {
    return Number(price).toLocaleString("ar-EG") + " " + currency;
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


    const countryButton =
        document.querySelector(
            ".filter.active"
        );


    const country =
        countryButton
            ? countryButton.dataset.country
            : "all";


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
                account.country === country;


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
                    account.country
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


    $("accountCount").textContent =
        filtered.length
        +
        " منتج";


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
                            <button type="button" aria-label="الصورة السابقة" onclick="changeCardImage(event, '${account.id}', -1)">→</button>
                            <span id="card-image-count-${account.id}">1 / ${account.images.length}</span>
                            <button type="button" aria-label="الصورة التالية" onclick="changeCardImage(event, '${account.id}', 1)">←</button>
                        </div>
                    ` : ""}
                    `

                    :

                    `
                    <div class="no-image">
                        ${icon}
                        <br>
                        لا توجد صورة
                    </div>
                    `
                }


                <span class="product-type">

                    ${icon}
                    ${escapeHTML(account.type)}

                </span>


                <span class="country-badge">

                    ${escapeHTML(account.country)}

                </span>


            </div>


            <div class="account-body">


                <div class="account-top">

                    <h3>
                        ${escapeHTML(account.name)}
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
                        ${escapeHTML(account.quantity)}
                    </span>
                    `
                    :
                    ""
                }


                <p class="account-description">

                    ${escapeHTML(
                        account.description
                        ||
                        "لا يوجد وصف لهذا المنتج."
                    )}

                </p>


                <div class="card-buttons">

                    <button
                        onclick="showDetails('${account.id}')"
                    >
                        التفاصيل
                    </button>


                    <button
                        class="buy"
                        onclick="openBuy('${account.id}')"
                    >
                        شراء
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
                ${escapeHTML(account.name)}
            </h2>
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
                    لا توجد صور
                </div>
                `
            }
            ${
                images.length > 1
                ?
                `
                <div class="details-slider-controls">
                    <button type="button" aria-label="الصورة السابقة" onclick="changeDetailsImage(-1)">→</button>
                    <span id="detailsImageCounter">1 / ${images.length}</span>
                    <button type="button" aria-label="الصورة التالية" onclick="changeDetailsImage(1)">←</button>
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
                    account.description
                    ||
                    "لا يوجد وصف."
                )}
            </p>
            <button
                class="main-button full"
                onclick="
                    closeModal('detailsModal');
                    openBuy('${account.id}');
                "
            >
                شراء عبر WhatsApp
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
                لا توجد صور
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
                "لا يوجد وصف."
            )}

        </p>


        <button
            class="main-button full"
            onclick="
                closeModal('detailsModal');
                openBuy('${account.id}');
            "
        >

            شراء عبر WhatsApp

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
    previous.setAttribute("aria-label", "الصورة السابقة");
    previous.addEventListener("click", event => {
        event.stopPropagation();
        moveImage(-1);
    });

    const next = document.createElement("button");
    next.type = "button";
    next.className = "viewer-arrow viewer-next";
    next.textContent = "←";
    next.setAttribute("aria-label", "الصورة التالية");
    next.addEventListener("click", event => {
        event.stopPropagation();
        moveImage(1);
    });

    const close = document.createElement("button");
    close.type = "button";
    close.className = "viewer-close";
    close.textContent = "×";
    close.setAttribute("aria-label", "إغلاق الصور");

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

                ${escapeHTML(account.name)}

            </strong>

            <br>

            <span class="muted">

                ${escapeHTML(account.type)}

                •
                ${escapeHTML(account.country)}

            </span>

            ${
                account.quantity
                ?
                `
                <br>
                <span
                    style="color:#43a8ff"
                >
                    ${escapeHTML(account.quantity)}
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

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".filter")
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
        prompt(
            "اكتب كود الإدارة:"
        );


    if (code === ADMIN_CODE) {

        renderAdmin();

        openModal("adminModal");

    }

    else if (code !== null) {

        alert(
            "كود الإدارة غير صحيح."
        );

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


            alert(
                "تم حفظ المنتج بنجاح!"
            );

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
                لا توجد منتجات حاليًا.
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
                                account.name
                            )}

                        </strong>

                        <p>

                            ${escapeHTML(
                                account.type
                            )}

                            •
                            ${escapeHTML(
                                account.country
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
                                    account.quantity
                                )
                                :
                                ""
                            }

                            •
                            ${(account.images || []).length}
                            صور

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
                            تعديل
                        </button>


                        <button
                            class="delete"
                            onclick="
                                deleteAccount(
                                    '${account.id}'
                                )
                            "
                        >
                            حذف
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
        account.country;


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
        confirm(
            "هل تريد حذف المنتج " +
            account.name +
            "؟"
        );


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
   طرق الدفع
================================================== */

document
    .querySelectorAll(".payment")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".payment"
                    )
                    .forEach(
                        b =>
                            b.classList
                                .remove("active")
                    );


                this.classList
                    .add("active");


                selectedPayment =
                    this.dataset.payment;

            }
        );

    });


/* ==================================================
   إرسال الطلب إلى WhatsApp
================================================== */

$("buyForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (!currentAccount) {
                return;
            }


            const buyerName =
                $("buyerName")
                    .value
                    .trim();


            const buyerEmail =
                $("buyerEmail")
                    .value
                    .trim();


            const buyerPhone =
                $("buyerPhone")
                    .value
                    .trim();


            const message =

                "طلب جديد من PUBG Market\n\n" +

                "المنتج: " +
                currentAccount.name +
                "\n" +

                "النوع: " +
                currentAccount.type +
                "\n" +

                "الدولة: " +
                currentAccount.country +
                "\n" +

                (
                    currentAccount.quantity
                    ?
                    "الكمية: " +
                    currentAccount.quantity +
                    "\n"
                    :
                    ""
                ) +

                "السعر: " +
                formatPrice(
                    currentAccount.price,
                    currentAccount.currency
                ) +
                "\n\n" +

                "اسم العميل: " +
                buyerName +
                "\n" +

                "البريد: " +
                buyerEmail +
                "\n" +

                "الهاتف: " +
                buyerPhone +
                "\n" +

                "الدفع: " +
                selectedPayment;


            const whatsappURL =

                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappURL,
                "_blank"
            );


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

renderAccounts();