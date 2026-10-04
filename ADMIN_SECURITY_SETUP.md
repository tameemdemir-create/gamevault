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

ملف `database.rules.json` يسمح للزوار بقراءة بيانات المنتجات العامة، ويقصر تعديلها على هذا البريد بعد التحقق منه. أكواد المنتجات محفوظة منفصلة في `productCodes` ولا يستطيع قراءتها أو تعديلها إلا المدير الموثّق. لا تفتح قراءة `productCodes` للعامة لتجاوز خطأ التحقق؛ هذا يكشف أكواد المنتجات.

التحقق التلقائي من الأكواد يعمل عبر Cloudflare Worker مجاني بدل Firebase Cloud Functions، لأن نشر الدوال يتطلب خطة Blaze. اتبع خطوات الإعداد في [cloudflare-worker/README.md](./cloudflare-worker/README.md)، ثم ضع رابط Worker المنشور في `CODE_VERIFICATION_URL` داخل `script.js` وانشر الموقع المحدّث. لا تضع مفتاح حساب الخدمة في ملفات الموقع أو المستودع؛ خزّنه كـ Cloudflare Worker Secret وامنحه صلاحية قراءة قاعدة البيانات فقط.

بعد نشر القواعد وإعداد Worker وتحديث الموقع، سجّل الدخول بحساب المدير وافتح لوحة التحكم مرة واحدة. سينقل الموقع الأكواد القديمة تلقائيًا إلى التخزين الخاص ويحذفها من بيانات المنتجات العامة. **لا تعلن تفعيل الموقع للعملاء قبل إتمام هذه الخطوة** إذا كانت قاعدة البيانات تحتوي على أكواد قديمة؛ إذ تبقى الأكواد القديمة مكشوفة في سجل المنتجات إلى أن تتم هجرتها.

في لوحة التحكم، اترك خيار **تفعيل الكود للزبون** دون تحديده إلى أن تتأكد من استلام الدفع، ثم فعّله واحفظ المنتج. سيظل الكود مرتبطًا بالمنتج وظاهرًا للمدير عند إلغاء التفعيل، لكن الخادم سيرفض استخدامه من العملاء.

وضع `localhost` يبقى مفتوحًا للتجربة ولا يتصل بقاعدة Firebase الحية.

## ربط PayPal Sandbox

الدفع يعمل افتراضيًا في وضع Sandbox ولا يخصم أموالًا حقيقية. يتحول إلى Live فقط عند ضبط `PAYPAL_ENVIRONMENT=live` وإضافة مفاتيح Live لحساب تجاري مؤهل. يتطلب نشر Cloud Functions تفعيل خطة Blaze في Firebase؛ قد تُحتسب رسوم حسب الاستخدام.

1. من PayPal Developer Dashboard أنشئ تطبيقًا ضمن **Sandbox** وخذ **Client ID** و **Secret** للتطبيق. لا تستخدم بيانات Live للاختبار.
2. احفظ Client ID وSecret كأسرار Firebase؛ ستطلب الطرفية القيمة مباشرة، فاكتبها هناك ولا تضعها في GitHub أو المحادثة:

   ```powershell
   firebase functions:secrets:set PAYPAL_CLIENT_ID --project gamevault-5458b
   firebase functions:secrets:set PAYPAL_CLIENT_SECRET --project gamevault-5458b
   ```

3. الوضع الافتراضي `sandbox`. عند اختبار الدفع استخدم مفاتيح Sandbox وحساب مشتري Sandbox.
4. لتفعيل Live بعد التأكد من أهلية حساب PayPal التجاري، أضف `PAYPAL_ENVIRONMENT=live` إلى ملف `functions/.env.gamevault-5458b` محليًا فقط، ثم استبدل الأسرار بمفاتيح Live. ملف البيئة مستثنى من Git؛ لا ترفعه أبدًا.
5. PayPal لا يدعم JOD كعملة دفع في التكامل الحالي. غيّر سعر المنتج وعملته يدويًا إلى عملة مدعومة مثل USD من لوحة الإدارة؛ لا يُحوّل الموقع السعر تلقائيًا.
6. انشر دوال الدفع:

   ```powershell
   firebase deploy --only functions:createPayPalOrder,functions:capturePayPalOrder --project gamevault-5458b
   ```

7. اختبر باستخدام حساب مشتري Sandbox؛ لن يتم تحصيل مبلغ حقيقي.

تُحفظ الطلبات المدفوعة في Realtime Database تحت `orders`، ويمكن للمدير الموثّق فقط قراءتها. الدفع لا يسلّم حساب PUBG أو يشحن UC تلقائيًا؛ يجب تنفيذ التسليم يدويًا من تفاصيل الطلب إلى أن تضاف آلية تسليم منفصلة.
