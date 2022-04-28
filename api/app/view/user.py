#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import sys
from logging import exception
from flask_cors import CORS, cross_origin
import bcrypt
from flask import request, Blueprint
import uuid

from tool.session_tools import create_session_token, get_session_validty, delete_session_token, get_session_token
from tool.email_tools import send_welcome_email, send_forgoten_password

from view import redisCache as redis, mongoDB as mongo, SALT
from model.user_model import User

app = Blueprint('user', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route("user", methods=['post']) #ok
@cross_origin()
def create_user():
    """
    create a user
    """
    try:
        data = request.get_json()
        if "role" in data and data["role"] == "admin":
            role = "admin"
        else:
            role = "user"
        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=bcrypt.hashpw(data['password'].encode('utf-8'), SALT).decode('utf-8'),
            role=role
        )
        user.save()
        try:
            send_welcome_email(data['email'])
        except Exception as e:
            print(str(e), file=sys.stderr)
            pass
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("forgoten_password/<email>", methods=['post'])
@cross_origin()
def forgoten_password_email(email):
    """
    send a new password to the user

    Args:
        email (email): send new password to the user with a new password
    """
    try:
        user = User.objects(email=email).first()
        if user:
            password = str(uuid.uuid4())
            user.update(
                password=bcrypt.hashpw(password.encode('utf-8'), SALT).decode('utf-8')
            )
            try:
                send_forgoten_password(email, password)
            except Exception as e:
                print(str(e), file=sys.stderr)
                pass
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except Exception as e:
        return {'status': 'fail', 'message': 'Invalid data', "error": str(e)}
    

@app.route("login_user", methods=['post']) #ok
@cross_origin()
def login_user():
    """
    login a user
    """
    try:
        data = request.get_json()
        user = User.objects(email=data['email']).first()
        if user:
            if bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
                token = create_session_token(user)
                return {'status': 'success', "token": token}
            else:
                return {'status': 'fail', 'message': 'Invalid password'}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("logout_user/<email>", methods=['post']) #ok
@cross_origin()
def logout_user(email):
    """
    Log out the user

    Args:
        email (string): email of the user to logout
    """
    try:
        user = User.objects(email=email).first()
        delete_session_token(user)
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("user/<email>", methods=['get']) #ok
@cross_origin()
def get_user(email):
    """
    get user with email

    Args:
        email (string): email of the user
    """
    try:
        user = User.objects(email=email).first()
        if user:
            if get_session_validty(user) == "ko":
                return {'status': 'fail', 'message': 'Session expired'}
            user_data = json.loads(user.to_json())
            del user_data['password']
            del user_data['_id']
            return {'status': 'success', 'user': user_data}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("user/<email>", methods=['put']) #ok
@cross_origin()
def update_user(email):
    """
    update user

    Args:
        email (string): email of the user
    """
    try:
        data = request.get_json()
        user = User.objects(email=email).first()
        if user:
            if get_session_validty(user) == "ko":
                return {'status': 'fail', 'message': 'Session expired'}
            user.update(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
            )
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except:
        return {'status': 'fail', 'message': 'Invalid data'}


@app.route("user_update_password/<email>", methods=['put']) #ok
@cross_origin()
def update_user_password(email):
    """
    update user password

    Args:
        email (string): email of the user
    """
    try:
        data = request.get_json()
        user = User.objects(email=email).first()
        if user:
            if get_session_validty(user) == "ko":
                return {'status': 'fail', 'message': 'Session expired'}
            user.update(
                password=bcrypt.hashpw(data['password'].encode('utf-8'), SALT).decode('utf-8')
            )
            delete_session_token(user)
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except Exception as e:
        return {'status': 'fail', 'message': 'Invalid data', "error": str(e)}


@app.route("user/<email>", methods=['delete']) #ok
@cross_origin()
def delete_user(email):
    """
    delete user

    Args:
        email (string): email of the user
    """
    try:
        user = User.objects(email=email).first()
        if user:
            if get_session_validty(user) == "ko":
                return {'status': 'fail', 'message': 'Session expired'}
            delete_session_token(user)
            user.delete()
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("user_get_token/<email>", methods=['get'])
@cross_origin()
def user_get_token(email):
    """
    get session token for the user

    Args:
        email (string): email of the user
    """
    try:
        user = User.objects(email=email).first()
        if user:
            if get_session_validty(user) == "ko":
                return {'status': 'fail', 'message': 'Session expired'}
            token = get_session_token(user)
            return {'status': 'success', 'token': str(token)}
        else:
            return {'status': 'fail', 'message': 'User does not exist'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

#-----------------------------------------------------
#Dev only

@app.route("/dev/reset_db", methods=['DELETE']) #ok
@cross_origin()
def reset_db():
    """
    clean db
    """
    try:
        User.drop_collection()
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

#-----------------------------------------------------