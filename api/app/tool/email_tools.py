import requests

def send_welcome_email(email):
    """
    Send welcome email

    Args:
        email (string): email of the user
    """

    requests.post("http://mail_api:8080/mail_service/send_welcome", json={"email": email})

def send_forgoten_password(email, password):
    """
    send email with a new password

    Args:
        email (email): email of the user
        password (password): new password ot the user
    """

    requests.post("http://mail_api:8080/mail_service/send_forgoten_password", json={"email": email, "password": password})

