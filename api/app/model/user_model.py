
from email.policy import default
from view import mongoDB as mongo

class User(mongo.Document):
    """
    Model of user

    Args:
        mongo (mongo db lib): model for the user
    """
    first_name = mongo.StringField()
    last_name = mongo.StringField() 
    email = mongo.StringField()
    password = mongo.StringField()
    role = mongo.StringField(default="user")
    device_uuid=mongo.StringField(default="")
    device_name=mongo.StringField(default="")