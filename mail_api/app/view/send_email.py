#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_mail import Mail, Message
import json
from logging import exception
from flask_cors import CORS, cross_origin
from flask import request, Blueprint

from view import mail_app as mail

app = Blueprint('mail_service', __name__, url_prefix="/mail_service/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route("send_welcome", methods=['post']) #ok
def send_welcome():
    """
    send welcome email
    """
    try:
        data = request.get_json()
        msg = Message(
            subject="Welcome to the app",
            sender="bobmarcel73@gmail.com",
            recipients=[data["email"]],
            body="Welcome to the app"
        )
        mail.send(msg)
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("send_forgoten_password", methods=['post']) #ok
def send_forgoten_password():
    """
    send forgoten password email
    """
    try:
        data = request.get_json()
        msg = Message(
            subject="Welcome to the app",
            sender="bobmarcel73@gmail.com",
            recipients=[data["email"]],
            body=f"your new password is : '{data['password']}'"
        )
        mail.send(msg)
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

