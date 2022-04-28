#!/usr/bin/env python
# -*- coding: utf-8 -*-

import uuid
import time
import requests

class User:
    def __init__(self):
        self.port = "8080"
        self.host = 'api'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)
        self.reset_db()

    def create_user(self, password :str, email :str, last_name :str, first_name :str, role :str):
        """
        create a user

        Args:
            password (str): password
            email (str): email
            last_name (str): last name
            first_name (str): first name
            role (str): role
        """

        playload = {
            'first_name' : first_name,
            'last_name' : last_name,
            'email' : email,
            'password' : password,
            'role' : role
        }
        res = requests.post(self.url + "/user", json=playload).json()
        if res["status"] != "success":
            raise Exception("Error creating user")

    def login_user(self, email :str, password :str):
        """
        login a user

        Args:
            email (str): email
            password (str): password
        """
        playload = {
            'email' : email,
            'password' : password
        }
        res = requests.post(self.url + "/login_user", json=playload).json()
        if res["status"] != "success":
            raise Exception("Error logging in")

    def logout_user(self, email :str):
        """
        logout a user

        Args:
            email (str): email
        """
        res = requests.post(self.url + "/logout_user/{}".format(email)).json()
        if res["status"] != "success":
            raise Exception("Error logging out")

    def get_user(self, email :str):
        """
        get a user

        Args:
            email (str): email
        """
        try:
            res = requests.get(self.url + "/user/{}".format(email)).json()
            if res["status"] != "success":
                raise Exception("Error getting user")
        except:
            pass

    def reset_password(self, email :str, password :str):
        """
        reset a user password

        Args:
            email (str): email
        """
        playload = {
            "password" : password
        }
        res = requests.post(self.url + "/forgoten_password/{}".format(email), json=playload).json()
        if res["status"] != "success":
            raise Exception("Error resetting password")

    def update_user(self, email :str, last_name :str, first_name :str):
        """
        update a user

        Args:
            email (str): email
            last_name (str): last name
            first_name (str): first name
        """
        playload = {
            'first_name' : first_name,
            'last_name' : last_name,
            'email' : email
        }
        res = requests.put(self.url + "/user/{}".format(email), json=playload).json()
        if res["status"] != "success":
            raise Exception("Error updating user")


    def delete_user(self, email :str):
        """
        delete a user

        Args:
            email (str): email
        """
        res = requests.delete(self.url + "/user/{}".format(email)).json()
        if res["status"] != "success":
            raise Exception("Error deleting user")


    def reset_db(self):
        """
        clean db
        """
        res = requests.delete(self.url + "/dev/reset_db").json()
        if res["status"] != "success":
            raise Exception("Error resetting db")

    def test_1(self):
        """
        test_1
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 1 OK")

    def test_2(self):
        """
        test_2
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 2 OK")

    def test_3(self):
        """
        test_3
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())

        email1 = str(uuid.uuid4()) + "@test.com"
        password1 = str(uuid.uuid4())
        name1 = str(uuid.uuid4())

        self.create_user(password, email, name, name, "admin")
        self.create_user(password1, email1, name1, name1, "admin")

        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        try:
            self.get_user(email1)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email1, password1)
        self.get_user(email1)
        self.delete_user(email)
        self.delete_user(email1)
        print("Test 3 OK")

    def test_4(self):
        """
        test_4
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 4 OK")

    def test_5(self):
        """
        test_5
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 5 OK")

    def test_6(self):
        """
        test_6
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())

        email1 = str(uuid.uuid4()) + "@test.com"
        password1 = str(uuid.uuid4())
        name1 = str(uuid.uuid4())

        self.create_user(password, email, name, name, "admin")
        self.create_user(password1, email1, name1, name1, "admin")

        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        try:
            self.get_user(email1)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email1, password1)
        self.get_user(email1)
        self.delete_user(email)
        self.delete_user(email1)
        print("Test 6 OK")

    def test_7(self):
        """
        test_7
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 7 OK")

    def test_8(self):
        """
        test_8
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 8 OK")

    def test_9(self):
        """
        test_9
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())

        email1 = str(uuid.uuid4()) + "@test.com"
        password1 = str(uuid.uuid4())
        name1 = str(uuid.uuid4())

        self.create_user(password, email, name, name, "admin")
        self.create_user(password1, email1, name1, name1, "admin")

        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        try:
            self.get_user(email1)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email1, password1)
        self.get_user(email1)
        self.delete_user(email)
        self.delete_user(email1)
        print("Test 9 OK")

    def test_10(self):
        """
        test_10
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 10 OK")

    def test_11(self):
        """
        test_11
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())
        self.create_user(password, email, name, name, "admin")
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        self.update_user(email, name + "1", name + "2")
        self.logout_user(email)
        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.delete_user(email)
        print("Test 11 OK")

    def test_12(self):
        """
        test_12
        """
        email = str(uuid.uuid4()) + "@test.com"
        password = str(uuid.uuid4())
        name = str(uuid.uuid4())

        email1 = str(uuid.uuid4()) + "@test.com"
        password1 = str(uuid.uuid4())
        name1 = str(uuid.uuid4())

        self.create_user(password, email, name, name, "admin")
        self.create_user(password1, email1, name1, name1, "admin")

        try:
            self.get_user(email)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email, password)
        self.get_user(email)
        try:
            self.get_user(email1)
            raise Exception("Session Error")
        except:
            pass
        self.login_user(email1, password1)
        self.get_user(email1)
        self.delete_user(email)
        self.delete_user(email1)
        print("Test 12 OK")