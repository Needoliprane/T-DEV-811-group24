
from flask import Flask
from flask_mail import Mail, Message
import redis

from view.config import MAIL_PASSWORD, MAIL_USERNAME

APP = Flask(__name__)
mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": MAIL_USERNAME,
    "MAIL_PASSWORD": MAIL_PASSWORD
}

APP.config.update(mail_settings)
mail_app = Mail(APP)


redisCache = redis.Redis(host="redis", port=6379)
#redisCache = redis.Redis(host="0.0.0.0", port=6379)

#redisCache.flushdb()

