from app.services.email_alert import send_email_alert

send_email_alert(
    "JalRakshak Warning",
    "Unsafe water conditions detected!",
    "rudrasundgikar@gmail.com"
)