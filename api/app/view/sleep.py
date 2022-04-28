#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import json
import requests
from flask_cors import CORS, cross_origin
from flask import request, Blueprint

from view import redisCache_sleep as redis, EXPIRATION

app = Blueprint('sleep', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

#used api doc : https://rapidapi.com/apidojo/api/hotels4

headers = {
	        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
	        "X-RapidAPI-Key": "6636c7db21mshf2bc4d2c45de869p161483jsndc66b70663d9",
            'Content-Type': 'application/json'
}

"""
# To do adapt better handling of number of person 
nb of person : 2
adult1, adult2
not adult1:2
"""

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

@app.route('/hotel/autocomplete', methods=['GET'])
@cross_origin()
def autocomplete():
    """
    Autocomplete for hotels
    """
    try:
        data = request.get_json()
        if "search" not in data:
            return {'status': 'fail', 'message': 'search parameter is missing'}
        if caching_handler(data["search"]):
            return {'status': 'success', 'data': caching_handler(data["search"])}
        querystring = {"query": data["search"], "locale":"fr_FR", "currency":"EUR"}
        response = requests.get("https://hotels4.p.rapidapi.com/locations/v2/search", headers=headers, params=querystring)
        res = []
        for elem_b in response.json()["suggestions"]:
            group = elem_b["group"]
            for elem in elem_b["entities"]:
                res.append(
                    {
                        "name" : elem["name"],
                        "group" : group,
                        "id" : elem["destinationId"]
                    }
                )
        add_caching(data["search"], res)
        return {'status': 'success', 'data': res}
    except:
        return {'status': 'fail', 'message': 'error'}

@app.route('/hotel_by_destinationID/<id>', methods=['GET'])
@cross_origin()
def hotel_by_location(id):
    """
    Get hotels by location
    """
    try:
        data = request.get_json()
        if caching_handler(id):
            return {'status': 'success', 'data': caching_handler(id)}
        # querystring = {"destinationId":"504261","pageNumber":"1","pageSize":"25","checkIn":"2020-01-08","checkOut":"2020-01-15","adults1":data["nbOfPerson"],"sortOrder":data["sort"],"locale":"fr","currency":"EUR"}

        querystring = {"destinationId":id,"pageNumber":"1","pageSize":"25","checkIn":data["checkIn"],"checkOut":data["checkOut"],"adults1":data["nbOfPerson"],"sortOrder":data["sort"],"locale":"fr_FR","currency":"EUR"}
        response = requests.get("https://hotels4.p.rapidapi.com/properties/list", headers=headers, params=querystring)
        res = []
        import sys
        print(response, response.text, file=sys.stderr)
        print(response.json(), sys.stderr)
        for elem in response.json()["data"]["body"]["searchResults"]["results"]:
            res.append(elem)
        add_caching(id, res)
        return {'status': 'success', 'data': res}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route('/hotel_by_id/<id>', methods=['GET'])
@cross_origin()
def hotel_by_id(id):
    """
    Get hotels by id
    """
    import sys
    try:
        data = request.get_json()
        if caching_handler(id):
            return {'status': 'success', 'data': caching_handler(id)}
        querystring = {"id":id,"checkIn":data["checkIn"],"checkOut":data["checkOut"],"adults1":data["nbOfPerson"],"currency":"EUR","locale":"fr_FR"}
        response_data = requests.get("https://hotels4.p.rapidapi.com/properties/get-details", headers=headers, params=querystring, stream=True)
        response_picture = requests.get("https://hotels4.p.rapidapi.com/properties/get-hotel-photos", headers=headers, params={"id":id}, stream=True)
        res = {
            "data" : response_data.json()["data"]["body"],
            "hotelImages": response_picture.json()["hotelImages"],
            "roomImages" : response_picture.json()["roomImages"]
        }
        add_caching(id, res)
        return {'status': 'success', 'data': res}
    except:
        return {'status': 'fail', 'message': 'error'}