# تفعيل الترجمة التلقائية

الموقع يترجم حقول المنتجات الناقصة عند الحفظ باستخدام Google Cloud Translation عبر Firebase Cloud Function. لا يُحفظ مفتاح Google في المتصفح. الوظيفة تتطلب تسجيل دخول Firebase وتحد الترجمة إلى 20,000 حرف يوميًا لكل مستخدم.

## الإعداد والنشر

1. فعّل خطة Blaze لمشروع Firebase `gamevault-5458b`، ثم فعّل **Cloud Translation API** في Google Cloud Console. استخدام الترجمة يخضع لتسعير Google.
2. امنح حساب خدمة Cloud Functions دور **Cloud Translation API User** (`roles/cloudtranslate.user`). في الجيل الثاني يكون الحساب الافتراضي عادةً `PROJECT_NUMBER-compute@developer.gserviceaccount.com`.
3. استخدم Node.js 22 في الطرفية؛ بيئة التطوير الحالية تستخدم Node 26 الذي لا يدعمه Firebase CLI. ثم ثبّت Firebase CLI وسجّل الدخول:

   ```powershell
   npm install -g firebase-tools
   firebase login
   ```

4. من مجلد المشروع انشر الوظيفة:

   ```powershell
   firebase deploy --only functions:translateProduct --project gamevault-5458b
   ```

5. سجّل الدخول إلى الموقع قبل حفظ منتج يحتاج إلى ترجمة تلقائية. المنتجات القديمة تُترجم عند فتحها للتعديل وحفظها من جديد.

يمكن ضبط ميزانية وتنبيهات في Google Cloud Console لمراقبة رسوم الترجمة.
