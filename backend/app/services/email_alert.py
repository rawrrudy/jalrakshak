import smtplib
from email.mime.text import MIMEText
from app.core.config import EMAIL_ADDRESS, EMAIL_PASSWORD

def send_email_alert(subject, message, receiver_email):

    try:
        msg = MIMEText(message)
        msg["Subject"] = subject
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = receiver_email

        print("Attempting to send email...")

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            print("EMAIL:", EMAIL_ADDRESS)
            print("PASSWORD LENGTH:", len(EMAIL_PASSWORD))

            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)

        print("Email sent successfully!")

    except Exception as e:
        print("Email error:", e)