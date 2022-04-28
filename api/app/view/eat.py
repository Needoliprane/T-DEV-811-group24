#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import sys
import requests
from flask_cors import CORS, cross_origin
from flask import request, Blueprint

from view import redisCache_eat as redis, EXPIRATION

app = Blueprint('eat', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

headers_restaurant = {
	"content-type": "application/x-www-form-urlencoded",
	"X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
	"X-RapidAPI-Key": "6636c7db21mshf2bc4d2c45de869p161483jsndc66b70663d9"
}

#used api doc : https://rapidapi.com/ptwebsolution/api/worldwide-restaurants/

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

@app.route("eat/city_id/<city>", methods=['GET'])
@cross_origin()
def get_city_id(city :str):
    """
    get city id

    Args:
        city (string): name of the city

    Returns:
        dict: result
    """
    try:
        payload = f"q={city}&language=en_US"
        response = requests.post("https://worldwide-restaurants.p.rapidapi.com/typeahead", data=payload, headers=headers_restaurant)
        res = []
        for elem in response.json()["results"]["data"]:
            res.append({
                "id" : elem["result_object"]["location_id"],
                "name" : elem["result_object"]["name"],
                "timezone" : elem["result_object"]["timezone"], 
            })
        return {"status": "success", "data": res}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.route("eat/restaurant/<city_id>", methods=['GET'])
@cross_origin()
def get_restaurant(city_id :str):
    """
    get restaurant

    Args:
        city_id (str):id of the city

    Returns:
        dict: restaurant data
    """
    try:
        if caching_handler(city_id) is not None:
            return {'status': 'success', 'data': caching_handler(city_id)}
        payload = f"language=en_US&limit=30&location_id={city_id}&currency=EUR"
        response = requests.post("https://worldwide-restaurants.p.rapidapi.com/search", data=payload, headers=headers_restaurant)
        add_caching(city_id, response.json()["results"]["data"])
        return {"status": "success", "data": response.json()["results"]["data"]}
    except Exception as e:
        return {"status": "fail", "message": str(e)}