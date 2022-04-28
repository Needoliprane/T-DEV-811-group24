#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import sys
import requests
import urllib
from logging import exception
from flask_cors import CORS, cross_origin
from flask import request, Blueprint
from view import redisCache_drink as redis, EXPIRATION

app = Blueprint('drink', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

#used api doc : https://rapidapi.com/trueway/api/trueway-places/


@app.route('drink/ping', methods=['GET'])
@cross_origin()
def ping():
    """ping/pong

    Returns:
        Response html: pong
    """
    return "pong"


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


@app.route("drink/find_drink_by_city/<city>", methods=["GET"])
@cross_origin()
def find_drink_by_city(city: str):
    """
    find all bar/nightclub by city

    Args:
        city (str): city name

    Returns:
        dict: all bar/nightclub by city
    """
    try:
        if caching_handler(city) is not None:
            return {'status': 'success', 'data': caching_handler(city)}
        url = f"https://api.lyko.tech/v2.1/addresses?text={urllib.parse.quote(city)}&limit=10&locale=fr"
        res = requests.get(
            url, headers={"X-Api-Key": "api_1120813258"}).json()[0]["location"]
        querystring = {"location": f"{res['lat']},{res['lng']}",
                       "type": "night_club", "radius": "15000", "language": "en"}
        headers = {
            "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
            "X-RapidAPI-Key": "6636c7db21mshf2bc4d2c45de869p161483jsndc66b70663d9"
        }
        response = requests.get(
            "https://trueway-places.p.rapidapi.com/FindPlacesNearby", headers=headers, params=querystring).json()
        add_caching(city, response["results"])
        return {'status': 'success', 'data': response["results"]}
    except Exception as e:
        return {'status': 'error', 'data': str(e)}


@app.route("<service_type>/by_city/<city>", methods=["GET"])
@cross_origin()
def find_type_by_city(service_type :str, city: str):
    """
    get all services type by city name

    Args:
        service_type (str): wanted services provided by get_list_service_type
        city (str): name of the city

    Returns:
        dict: result
    """
    try:
        if caching_handler(service_type + "-" + city) is not None:
            return {'status': 'success', 'data': caching_handler(service_type + "-" + city)}
        url = f"https://api.lyko.tech/v2.1/addresses?text={urllib.parse.quote(city)}&limit=10&locale=fr"
        res = requests.get(
            url, headers={"X-Api-Key": "api_1120813258"}).json()[0]["location"]
        querystring = {"location": f"{res['lat']},{res['lng']}",
                       "type": service_type, "radius": "15000", "language": "en"}
        headers = {
            "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
            "X-RapidAPI-Key": "6636c7db21mshf2bc4d2c45de869p161483jsndc66b70663d9"
        }
        response = requests.get(
            "https://trueway-places.p.rapidapi.com/FindPlacesNearby", headers=headers, params=querystring).json()
        add_caching(service_type + "-" + city, response["results"])
        return {'status': 'success', 'data': response["results"]}
    except Exception as e:
        return {'status': 'error', 'data': str(e)}

@app.route("get_list_of_provided_services", methods=["GET"])
@cross_origin()
def get_list_of_provided_services():
    """
    get list of provided services

    Returns:
        dict: list of all provided services
    """
    return {"status": "success", "data": ["airport",
                                         "amusement_park",
                                         "aquarium",
                                         "art_gallery",
                                         "atm",
                                         "bakery",
                                         "bank",
                                         "bar",
                                         "beauty_salon",
                                         "bicycle_store",
                                         "book_store",
                                         "bowling",
                                         "bus_station",
                                         "cafe",
                                         "campground",
                                         "car_dealer",
                                         "car_rental",
                                         "car_repair",
                                         "car_wash",
                                         "casino",
                                         "cemetery",
                                         "church",
                                         "cinema",
                                         "city_hall",
                                         "clothing_store",
                                         "convenience_store",
                                         "courthouse",
                                         "dentist",
                                         "department_store",
                                         "doctor",
                                         "electrician",
                                         "electronics_store",
                                         "embassy",
                                         "fire_station",
                                         "flowers_store",
                                         "funeral_service",
                                         "furniture_store",
                                         "gas_station",
                                         "government_office",
                                         "grocery_store",
                                         "gym",
                                         "hairdressing_salon",
                                         "hardware_store",
                                         "home_goods_store",
                                         "hospital",
                                         "insurance_agency",
                                         "jewelry_store",
                                         "laundry",
                                         "lawyer",
                                         "library",
                                         "liquor_store",
                                         "locksmith",
                                         "lodging",
                                         "mosque",
                                         "museum",
                                         "night_club",
                                         "park",
                                         "parking",
                                         "pet_store",
                                         "pharmacy",
                                         "plumber",
                                         "police_station",
                                         "post_office",
                                         "primary_school",
                                         "rail_station",
                                         "real_estate_agency",
                                         "restaurant",
                                         "rv_park",
                                         "school",
                                         "secondary_school",
                                         "shoe_store",
                                         "shopping_center",
                                         "spa",
                                         "stadium",
                                         "storage",
                                         "store",
                                         "subway_station",
                                         "supermarket",
                                         "synagogue",
                                         "taxi_stand",
                                         "temple",
                                         "tourist_attraction",
                                         "train_station",
                                         "transit_station",
                                         "travel_agency",
                                         "university",
                                         "veterinarian",
                                         "zoo"]}
