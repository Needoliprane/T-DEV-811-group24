#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_cors import CORS, cross_origin
from flask import request, Blueprint
import requests
import json
import sys
from view import redisCache_direction as redis, EXPIRATION

app = Blueprint('direction', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})


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

def get_pos(departure):
    """
    Get open street map view of the adresse

    Args:
        departure (str): adresse of the place

    Returns:
        dict: dict
    """
    try:
        departure = departure.replace(" ", "%20")
        print("dep", departure)
        jsonDeparture = requests.get("https://api-adresse.data.gouv.fr/search/?q=" + departure +"&type=housenumber&autocomplete=1").json()
        cordinateDeparture = jsonDeparture["features"][0]["geometry"]["coordinates"]
        print(cordinateDeparture)
        link = "https://www.openstreetmap.org/export/embed.html?bbox=" + str(cordinateDeparture[0]) + "%2C" + str(cordinateDeparture[1]) +  "%2C" + str(cordinateDeparture[0]) + "%2C" + str(cordinateDeparture[1]) + "&amp;layer=mapnik"
        return {"status" : "success", "link" : link}
    except Exception as e:
        print(e)
        return {"status" : "error", "message" : str(e)}

def direction(departure, destination):
    """
    get direction from departure to destination

    Args:
        departure (str): address of departure
        destination (str): address of destination

    Returns:
        dict: dict
    """
    try:
            departure = departure.replace(" ", "%20")
            destination = destination.replace(" ", "%20")
            jsonDeparture = requests.get("https://api-adresse.data.gouv.fr/search/?q=" + departure +"&type=housenumber&autocomplete=1").json()
            cordinateDeparture = jsonDeparture["features"][0]["geometry"]["coordinates"]
            jsonDestination = requests.get("https://api-adresse.data.gouv.fr/search/?q=" + destination +"&type=housenumber&autocomplete=1").json()
            cordinateDestination = jsonDestination["features"][0]["geometry"]["coordinates"]
            link = "https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=" + str(cordinateDeparture[1]) + "%2C" + str(cordinateDeparture[0]) +"%3B" + str(cordinateDestination[1]) + "%2C" + str(cordinateDestination[0]) + "#map=13/"
            return {"status" : "success", "link" : link}
    except Exception as e:
            print("link error")
            return {"status" : "error", "message" : str(e)}

@app.route('direction/get_view', methods=['GET'])
@cross_origin()
def get_view():
    """
    get view
    """
    try:
        departure = request.get_json().get('departure')
        data = caching_handler(departure)
        if data is not None:
            return data
        data = get_pos(departure)
        add_caching(departure, data)
        return data
    except Exception as e:
        print(e)
        return {"status" : "error", "message" : str(e)}

@app.route('direction/get_direction', methods=['GET'])
@cross_origin()
def get_direction():
    """
    get direction
    """
    try:
        departure = request.get_json().get('departure')
        destination = request.get_json().get('destination')
        data = caching_handler(departure + destination)
        if data is not None:
            return data
        data = direction(departure, destination)
        add_caching(departure + destination, data)
        return data
    except Exception as e:
        print(e)
        return {"status" : "error", "message" : str(e)}