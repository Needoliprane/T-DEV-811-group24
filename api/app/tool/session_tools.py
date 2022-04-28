import jwt
import sys
import datetime
from view import redisCache as redis

def create_session_token(user):
    """
    Create token session

    Args:
        user (User Object): user info of the logged user
    """

    token = jwt.encode({'email': user.email, 'id': str(user.id), 'role':user.role, "exp": datetime.datetime.now() + datetime.timedelta(hours=36)}, 'secret', algorithm='HS256')
    redis.set(user.email, token)
    return token

def get_session_validty(user):
    """
    Get token session

    Args:
        user (User Object): user info of the logged user
    """

    token = redis.get(user.email)
    try:
        jwt.decode(token, 'secret', algorithms=['HS256'])
        return "ok"
    except:
        return "ko"

def delete_session_token(user):
    """
    Delete token session

    Args:
        user (User Object): user info of the logged user
    """
    redis.delete(user.email)

def get_session_token(user):
    """

    Get token session

    Args:
        user (User Object): user info of the logged user
    """
    token = redis.get(user.email)
    return token

def is_admin(user):
    """

    Check if user is admin

    Args:
        user (User Object): user info of the logged user
    """
    if get_session_validty(user) == "ok":
        if user.role == "admin":
            return "ok"
        else:
            return "ko"
    else:
        "ko"