#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import sys
from logging import exception
from flask_cors import CORS, cross_origin
import bcrypt
from flask import request, Blueprint

from tool.session_tools import is_admin

from view import SALT
from model.user_model import User


app = Blueprint('admin', __name__, url_prefix="/api_admin/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route("user/<admin_email>", methods=['get'])
@cross_origin()
def admin_get_users(admin_email):
    """
    get all users (only admin)

    Args:
        admin_email (email): email of a admin

    """
    try:
        res = []
        user = User.objects(email=admin_email).first()
        if user:
            if is_admin(user) != "ok":
                return {'status': 'fail', 'message': 'you are not an admin'}
            for user in User.objects:
                tmp = json.loads(user.to_json())
                if tmp["role"] == "user":
                    del tmp['password']
                    tmp["id"] = tmp["_id"]["$oid"]
                    del tmp["_id"]
                    res.append(tmp)                
            return {'status': 'success', 'data': res}
        else:
            return {'status': 'fail', 'message': 'user not found'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("user/<admin_email>", methods=['post'])
@cross_origin()
def admin_create_user(admin_email):
    """
    create a user (only admin)

    Args:
        admin_email (email): email of a admin

    """
    try:
        data = request.get_json()
        user_admin = User.objects(email=admin_email).first()
        if user_admin:
            if is_admin(user_admin) != "ok":
                return {'status': 'fail', 'message': 'you are not an admin'}
            user = User(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                password=bcrypt.hashpw(data['password'].encode('utf-8'), SALT).decode('utf-8'),
                role=data['role']
            )
            user.save()             
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'user not found'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("user/<admin_email>", methods=['put'])
@cross_origin()
def admin_update_user(admin_email):
    """
    update a user (only admin)

    Args:
        admin_email (email): email of a admin

    """
    try:
        data = request.get_json()
        user_admin = User.objects(email=admin_email).first()
        if user_admin:
            if is_admin(user_admin) != "ok":
                return {'status': 'fail', 'message': 'you are not an admin'}
            user = User.objects(id=data['id'])
            user.update(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
            )           
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'user not found'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}


@app.route("user/<admin_email>", methods=['delete'])
@cross_origin()
def admin_delete_user(admin_email):
    """
    delete a user (only admin)

    Args:
        admin_email (email): email of a admin

    """
    try:
        data = request.get_json()
        user_admin = User.objects(email=admin_email).first()
        if user_admin:
            if is_admin(user_admin) != "ok":
                return {'status': 'fail', 'message': 'you are not an admin'}
            user = User.objects(id=data['id'])
            user.delete()         
            return {'status': 'success'}
        else:
            return {'status': 'fail', 'message': 'user not found'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("user/<admin_email>/<user_id>", methods=['get'])
@cross_origin()
def admin_get_user_id(admin_email, user_id):
    """
    Admin can get single user info

    Args:
        admin_email (string): email of the admin
        user_id (id): id of the user 
    """
    try:
        user_admin = User.objects(email=admin_email).first()
        if user_admin:
            if is_admin(user_admin) != "ok":
                return {'status': 'fail', 'message': 'you are not an admin'}
            user = User.objects(id=user_id).first()
            if user:
                tmp = json.loads(user.to_json())
                del tmp['password']
                tmp["id"] = tmp["_id"]["$oid"]
                del tmp["_id"]
                return {'status': 'success', 'data': tmp}
            else:
                return {'status': 'fail', 'message': 'user not found'}
        else:
            return {'status': 'fail', 'message': 'user not found'}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}
