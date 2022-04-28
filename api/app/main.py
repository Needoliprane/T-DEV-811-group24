#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask import Response
from flask_cors import CORS, cross_origin

from view import APP

CORS(APP)

from view.user import app as user_blueprint
from view.admin import app as admin_blueprint
from view.eat import app as eat_blueprint
from view.drink import app as drink_blueprint
from view.enjoy import app as enjoy_blueprint
from view.sleep import app as sleep_blueprint
from view.travel import app as travel_blueprint
from view.covid import app as covid_blueprint
from view.direction import app as direction_blueprint

APP.register_blueprint(user_blueprint)
APP.register_blueprint(admin_blueprint)
APP.register_blueprint(eat_blueprint)
APP.register_blueprint(drink_blueprint)
APP.register_blueprint(enjoy_blueprint)
APP.register_blueprint(sleep_blueprint)
APP.register_blueprint(travel_blueprint)
APP.register_blueprint(covid_blueprint)
APP.register_blueprint(direction_blueprint)

import sys
# print(APP.url_map, file=sys.stderr)

CORS(APP, resources={r"*": {"origins": "*"}})

@APP.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    """ping/pong

    Returns:
        Response html: pong
    """
    return Response("pong",mimetype='text/html')

if __name__ == "__main__":
    """main
    """
    try :
        if os.path.exists("./cert.pem") and os.path.exists("./key.pem"):
            print("starting server server with SSL")
            APP.run(port="443", host="0.0.0.0", ssl_context=('cert.pem', 'key.pem'), debug=True)
        else:
            print("starting server server without SSL")
            APP.run(port="8080", host="0.0.0.0", debug=True)
    except Exception as e:
        print(str(e))
        pass