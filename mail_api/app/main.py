#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask import Response
from flask_cors import CORS, cross_origin

from view import APP

CORS(APP)

from view.send_email import app as email_blueprint

APP.register_blueprint(email_blueprint)

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
        APP.run(port="8080", host="0.0.0.0", debug=True)
    except Exception as e:
        print(str(e))
        pass