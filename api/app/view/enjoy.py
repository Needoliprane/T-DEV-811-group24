#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json
import urllib
import sys
from flask_cors import CORS, cross_origin
from flask import request, Blueprint

from view import redisCache_enjoy as redis, EXPIRATION

app = Blueprint('enjoy', __name__, url_prefix="/api/")

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

#used api doc : https://control.predicthq.com/explorer/events

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

# def get_event_list(lt :str, ln:str):
#     """
#     get all event for given lt and ln

#     Args:
#         lt (str): lt
#         ln (str): ln

#     Returns:
#         list: list of event
#     """
#     response = requests.get(
#         url="https://api.predicthq.com/v1/events",
#         headers={
#             "Authorization": "Bearer JC9Q4hsRUy8FCE2ShbXEcPv-kqxltkUaowD3f1wJ ",
#             "Accept": "application/json"
#         },
#         params={
#             "location_around.origin": f"{str(lt)},{str(ln)}",
#             "location_around.offset": "100km"
#         }
#     )
#     res =  response.json()
#     return res["results"]

# @app.route("enjoy/city/<city>", methods=['GET'])
# @cross_origin()
# def get_event_by_city_name(city):
#     """
#     get all event by city name

#     Args:
#         city (string): name of the city

#     Returns:
#         dict: result
#     """
#     try:
#         if caching_handler(city) is not None:
#             return {'status': 'success', 'data': caching_handler(city)}
#         url=f"https://api.lyko.tech/v2.1/addresses?text={urllib.parse.quote(city)}&limit=10&locale=fr"
#         res = requests.get(url, headers={"X-Api-Key": "api_1120813258"}).json()[0]["location"]
#         ret = get_event_list(res["lat"], res["lng"])
#         add_caching(city, ret)
#         return {"status": "success", "data": ret}    
#     except Exception as e:
#         print(e)
#         return {"status": "error", "error" : str(e)}

@app.route("enjoy/search", methods=['GET'])
@cross_origin()
def get_event_by_search():
    """
    get all event by search
    """
    try:
        data = request.get_json()
        if caching_handler(data["countryCode"] + data["search"]) is not None:
            return {'status': 'success', 'data': caching_handler(data["countryCode"] + data["search"])}
        url = f"https://app.ticketmaster.com/discovery/v2/suggest?apikey=k5uFzlaG6X1r5Luv1jYkZUVk3jo9dZcH&keyword={data['search']}&locale=*&countryCode={data['countryCode']}"
        res = requests.get(url).json()
        print(url, file=sys.stderr)
        add_caching(data["countryCode"] + data["search"], res)
        return {"status": "success", "data": res}
    except Exception as e:
        print(e)
        return {"status": "error", "error" : str(e)}

@app.route("enjoy/event/<event_id>", methods=['GET'])
@cross_origin()
def get_event_by_id(event_id):
    """
    get event by event_id

    Args:
        event_id (string): event_id

    Returns:
        dict: result
    """
    try:
        if caching_handler(event_id) is not None:
            return {'status': 'success', 'data': caching_handler(event_id)}
        url= f"https://app.ticketmaster.com/discovery/v2/events/{event_id}?apikey=k5uFzlaG6X1r5Luv1jYkZUVk3jo9dZcH&locale=*"
        res = requests.get(url).json()
        add_caching(event_id, res)
        return {"status": "success", "data": res}
    except Exception as e:
        print(e)
        return {"status": "error", "error" : str(e)}

@app.route("enjoy/city/<city>/<page>", methods=['GET'])
@cross_origin()
def get_event_by_city_name(city, page):
    """
    get all event by city name

    Args:
        city (string): name of the city

    Returns:
        dict: result
    """
    try:
        if caching_handler(city + page) is not None:
            return {'status': 'success', 'data': caching_handler(city + page)}
        url = f"https://app.ticketmaster.com/discovery/v2/events?apikey=k5uFzlaG6X1r5Luv1jYkZUVk3jo9dZcH&locale=*&city={urllib.parse.quote(city)}&page={urllib.parse.quote(page)}&size=20"
        res = requests.get(url).json()
        add_caching(city + page, res["_embedded"]["events"])
        return {"status": "success", "data": res["_embedded"]["events"]}    
    except Exception as e:
        print(e)
        return {"status": "error", "error" : str(e)}


