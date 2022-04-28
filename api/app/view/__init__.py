
from flask import Flask
import redis
import bcrypt
import sys
from flask_mongoengine import MongoEngine

APP = Flask(__name__)

redisCache = redis.Redis(host="redis", port=6379, db=0)
redisCache_drink = redis.Redis(host="redis", port=6379, db=1)
redisCache_eat = redis.Redis(host="redis", port=6379, db=2)
redisCache_enjoy = redis.Redis(host="redis", port=6379, db=3)
redisCache_sleep = redis.Redis(host="redis", port=6379, db=4)
redisCache_travel = redis.Redis(host="redis", port=6379, db=5)
redisCache_covid = redis.Redis(host="redis", port=6379, db=6)
redisCache_direction = redis.Redis(host="redis", port=6379, db=7)
#redisCache = redis.Redis(host="0.0.0.0", port=6379)

DEV_EXPIRATION = 60 * 60 * 24 * 7
PROD_EXPIRATION = 60 * 60
EXPIRATION = DEV_EXPIRATION

redisCache.flushdb()

APP.config['MONGODB_SETTINGS'] = {
    'db': 'followup',
    'host': 'mongodb',
    #'host': '0.0.0.0',
    'port': 27017,
    'username': 'root',
    'password': 'admin'
}

mongoDB = MongoEngine()
mongoDB.init_app(APP)

SALT = bcrypt.gensalt()

from model.user_model import User

if (User.objects(email="admin@admin.com").first() is None):
    print("Generating default user ...", file=sys.stderr)
    User(first_name="admin", last_name="admin", email="admin@admin.com", password=bcrypt.hashpw("admin".encode('utf-8'), SALT).decode('utf-8'), role="admin").save()
    User(first_name="u1", last_name="u1", email="u1@u1.com", password=bcrypt.hashpw("u1".encode('utf-8'), SALT).decode('utf-8'), role="user").save()
    User(first_name="u2", last_name="u2", email="u2@u2.com", password=bcrypt.hashpw("u2".encode('utf-8'), SALT).decode('utf-8'), role="user").save()
    User(first_name="u3", last_name="u3", email="u3@u3.com", password=bcrypt.hashpw("u3".encode('utf-8'), SALT).decode('utf-8'), role="user").save()
    User(first_name="u4", last_name="u4", email="u4@u4.com", password=bcrypt.hashpw("u4".encode('utf-8'), SALT).decode('utf-8'), role="user").save()
    print("admin : email : admin@admin.com | password : admin", file=sys.stderr)
    print("user : email : u1@u1.com | password : u1", file=sys.stderr)
    print("user : email : u2@u2.com | password : u2", file=sys.stderr)
    print("user : email : u3@u3.com | password : u3", file=sys.stderr)
    print("user : email : u4@u4.com | password : u4", file=sys.stderr)

