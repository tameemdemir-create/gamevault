# إعداد مدير GameVault

لوحة الإدارة في الموقع المنشور لا تقبل رمزًا ثابتًا داخل JavaScript. يلزم تسجيل الدخول ببريد المدير الموثّق، وتفرض قواعد Realtime Database البريد نفسه عند كتابة المنتجات.

## التفعيل

1. في Firebase Console افتح **Authentication > Sign-in method** وفعّل **Email/Password**.
2. افتح **Authentication > Settings > Authorized domains** وأضف `tameemdemir-create.github.io`، وأضف أي نطاق مخصص يستضيف الموقع. يجب أن يكون نطاق الموقع الذي تفتحه مسموحًا، وليس نطاق `firebaseapp.com` وحده.
3. من **Authentication > Templates** راجع قالبَي **Email address verification** و **Password reset**، وتأكد من اسم المرسل ورابط الإجراء/النطاق. أرسل الرسائل إلى صندوق بريد تملكه للتجربة.
4. افحص مجلد Spam/Junk وPromotions، وتأكد من كتابة البريد دون خطأ. Firebase لا يرسل رسالة تغيير كلمة السر إذا لم يكن البريد مرتبطًا بحساب؛ ومع حماية تعداد الحسابات قد تعرض الواجهة رسالة نجاح عامة في الحالتين.
5. إذا لم تصل الرسائل رغم ذلك، افتح **Authentication > Users** وتأكد أن الحساب أُنشئ، ثم راجع حد إرسال البريد وحالة Firebase Authentication للمشروع. أخطاء التكرار أو بلوغ الحد تظهر الآن برسالة أوضح في الموقع.
6. أنشئ حساب Firebase بعنوان `tameemdemir@gmail.com`، ثم تحقق من البريد وسجّل الدخول به إلى الموقع.
7. انشر قواعد قاعدة البيانات من مجلد المشروع باستخدام Firebase CLI:

   ```powershell
   firebase deploy --only database --project gamevault-5458b
   ```

ملف `database.rules.json` يسمح للزوار بقراءة المنتجات، ويقصر تعديلها على هذا البريد بعد التحقق منه. كل مستخدم يستطيع قراءة وتعديل ملفه الشخصي فقط. تأكد من استخدام حساب المدير الصحيح قبل نشر القواعد.

وضع `localhost` يبقى مفتوحًا للتجربة ولا يتصل بقاعدة Firebase الحية.

## ربط PayPal Sandbox

الدفع المضاف يعمل في وضع Sandbox فقط، ولا يخصم أموالًا حقيقية. يتطلب نشر Cloud Functions تفعيل خطة Blaze في Firebase؛ قد تُحتسب رسوم حسب الاستخدام.

1. من PayPal Developer Dashboard أنشئ تطبيقًا ضمن **Sandbox** وخذ **Client ID** و **Secret** للتطبيق. لا تستخدم بيانات Live للاختبار.
2. احفظ القيم كأسرار Firebase؛ ستطلب الطرفية القيمة مباشرة، فاكتبها هناك ولا تضعها في ملفات المشروع أو المحادثة:

   ```powershell
   firebase functions:secrets:set PAYPAL_CLIENT_ID --project gamevault-5458b
   firebase functions:secrets:set PAYPAL_CLIENT_SECRET --project gamevault-5458b
   ```

3. PayPal لا يدعم JOD كعملة دفع في التكامل الحالي. غيّر سعر المنتج وعملته يدويًا إلى عملة مدعومة مثل USD من لوحة الإدارة؛ لا يُحوّل الموقع السعر تلقائيًا.
4. انشر دوال الدفع وقواعد الطلبات:

   ```powershell
   firebase deploy --only functions:createPayPalOrder,functions:capturePayPalOrder,database --project gamevault-5458b
   ```

5. انشر `index.html` و `script.js` المحدثين على GitHub Pages. اختبر باستخدام حساب مشتري Sandbox؛ لن يتم تحصيل مبلغ حقيقي.

تُحفظ الطلبات المدفوعة في Realtime Database تحت `orders`، ويمكن للمدير الموثّق فقط قراءتها. الدفع لا يسلّم حساب PUBG أو يشحن UC تلقائيًا؛ يجب تنفيذ التسليم يدويًا من تفاصيل الطلب إلى أن تضاف آلية تسليم منفصلة.
