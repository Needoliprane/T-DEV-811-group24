#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_cors import CORS, cross_origin
from flask import request, Blueprint
import requests
import json
import sys
from view import redisCache_covid as redis, EXPIRATION

app = Blueprint('covid', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

#used api doc : https://rapidapi.com/SmartableAI/api/coronavirus-smartable/

headers = {
	"X-RapidAPI-Host": "coronavirus-smartable.p.rapidapi.com",
	"X-RapidAPI-Key": "6636c7db21mshf2bc4d2c45de869p161483jsndc66b70663d9"
}

def caching_handler(query):
    """
    caching handler
    """
    if redis.exists(query):
        print(f"Using cache on query : {query}", file=sys.stderr)
        return json.loads(redis.get(query))
    else:
        return None

def add_caching(query, data):
    """
    add caching
    """
    redis.set(query, json.dumps(data))
    redis.expire(query, EXPIRATION)

@app.route('covid/ping', methods=['GET'])
@cross_origin()
def ping():
    """ping/pong

    Returns:
        Response html: pong
    """
    return "pong"

@app.route("covid/get_stat_by_country/<country>", methods=["GET"])
@cross_origin()
def get_stat_by_country(country :str):
    """
    get covid statics by country

    Args:
        country (str): country code
    """
    try:
        url = f"https://coronavirus-smartable.p.rapidapi.com/stats/v1/{country}/"
        if caching_handler(country) is not None:
            return {'status': 'success', 'data': caching_handler(country)}
        response = requests.request("GET", url, headers=headers)
        add_caching(country, response.json()["stats"])
        return {'status': 'success', 'data': response.json()["stats"]}
    except Exception as e:
        return {'status': 'error', 'data': str(e)}
