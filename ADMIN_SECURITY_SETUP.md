# إعداد مدير GameVault

لوحة الإدارة في الموقع المنشور لا تقبل رمزًا ثابتًا داخل JavaScript. يلزم تسجيل الدخول ببريد المدير الموثّق، وتفرض قواعد Realtime Database البريد نفسه عند كتابة المنتجات.

## التفعيل

1. في Firebase Console افتح **Authentication > Sign-in method** وفعّل **Email/Password**.
2. افتح **Authentication > Settings > Authorized domains** وأضف `tameemdemir-create.github.io`. هذا هو النطاق المستخدم لرابط تأكيد البريد وإعادة تعيين كلمة السر على GitHub Pages؛ أضف أيضًا أي نطاق مخصص يستضيف الموقع.
3. من **Authentication > Templates** افحص قوالب **Email address verification** و **Password reset** وتأكد من صحة نص الرسائل واسم المرسل، ثم افحص مجلدي البريد العشوائي والتحديثات عند التجربة.
4. أنشئ حساب Firebase بعنوان `tameemdemir@gmail.com`، ثم تحقق من البريد وسجّل الدخول به إلى الموقع.
5. انشر قواعد قاعدة البيانات من مجلد المشروع باستخدام Firebase CLI:

   ```powershell
   firebase deploy --only database --project gamevault-5458b
   ```

ملف `database.rules.json` يسمح للزوار بقراءة المنتجات، ويقصر تعديلها على هذا البريد بعد التحقق منه. كل مستخدم يستطيع قراءة وتعديل ملفه الشخصي فقط. تأكد من استخدام حساب المدير الصحيح قبل نشر القواعد.

وضع `localhost` يبقى مفتوحًا للتجربة ولا يتصل بقاعدة Firebase الحية.
