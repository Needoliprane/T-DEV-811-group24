#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests

class Travel:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = '127.0.0.1'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)


@app.route("travel/plane_departure", methods=['get'])
@cross_origin()
def travel_plane_departure():
    """
    get all plane departure for a given date

    Returns:
        dict: result
    """
    try:
        data = request.get_json()
        if caching_handler(data["origin"] + "-" + data["destination"]) is not None:
            return {'status': 'success', 'data': caching_handler(data["origin"] + "-" + data["destination"])}
        url = "https://api.travelpayouts.com/v1/prices/calendar"
        querystring = {"depart_date":format_date(data["date"]),"origin":data["origin"],"destination":data["destination"],"calendar_type":"departure_date","currency":"EUR"}
        response = requests.request("GET", url, headers=headers, params=querystring).json()
        add_caching(data["origin"] + "-" + data["destination"], response["data"][data["date"]])
        return {'status': 'success', 'data': response["data"][data["date"]]}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("travel/plane_return", methods=['get'])
@cross_origin()
def travel_plane_return():
    """
    get all plane for a given date

    Returns:
        dict: result
    """
    try:
        data = request.get_json()
        if caching_handler(data["origin"] + "-" + data["destination"]) is not None:
            return {'status': 'success', 'data': caching_handler(data["origin"] + "-" + data["destination"])}
        url = "https://api.travelpayouts.com/v1/prices/calendar"
        querystring = {"depart_date":format_date(data["date"]),"origin":data["origin"],"destination":data["destination"],"calendar_type":"return_date","currency":"EUR"}
        response = requests.request("GET", url, headers=headers, params=querystring).json()
        add_caching(data["origin"] + "-" + data["destination"], response["data"][data["date"]])
        return {'status': 'success', 'data': response["data"][data["date"]]}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("travel/plane_departure/all", methods=['get'])
@cross_origin()
def travel_plane_departure_all():
    """
    get all plane departure for a given month

    Returns:
        dict: result
    """
    try:
        data = request.get_json()
        if caching_handler("all-" + data["origin"] + "-" + data["destination"]) is not None:
            return {'status': 'success', 'data': caching_handler("all-" + data["origin"] + "-" + data["destination"])}
        url = "https://api.travelpayouts.com/v1/prices/calendar"
        querystring = {"depart_date":format_date(data["date"]),"origin":data["origin"],"destination":data["destination"],"calendar_type":"departure_date","currency":"EUR"}
        response = requests.request("GET", url, headers=headers, params=querystring).json()
        add_caching("all-" + data["origin"] + "-" + data["destination"], response["data"])
        return {'status': 'success', 'data': response["data"]}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("travel/plane_return/all", methods=['get'])
@cross_origin()
def travel_plane_return_all():
    """
    get all plane return for a given mothn

    Returns:
        dict: response
    """
    try:
        data = request.get_json()
        if caching_handler("all-" + data["origin"] + "-" + data["destination"]) is not None:
            return {'status': 'success', 'data': caching_handler("all-" + data["origin"] + "-" + data["destination"])}
        url = "https://api.travelpayouts.com/v1/prices/calendar"
        querystring = {"depart_date":format_date(data["date"]),"origin":data["origin"],"destination":data["destination"],"calendar_type":"return_date","currency":"EUR"}
        response = requests.request("GET", url, headers=headers, params=querystring).json()
        add_caching("all-" + data["origin"] + "-" + data["destination"], response["data"])
        return {'status': 'success', 'data': response["data"]}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("travel/get_city_code/<city>", methods=['get'])
@cross_origin()
def travel_get_city_code(city :str):
    """
    get city code from city name

    Args:
        city (str): name of the city

    Returns:
        dict: result of the request
    """
    try:
        if caching_handler(city) is not None:
            return {'status': 'success', 'data': caching_handler(city)}
        response = requests.get("https://api.travelpayouts.com/data/en/cities.json", headers=headers).json()
        res = []
        for i in response:
            if i["name"].lower() == city.lower():
                res.append(i)
        add_caching(city, res)
        return {'status': 'success', 'data': res}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}

@app.route("travel/get_airport_by_city_code/<city_code>", methods=['get'])
@cross_origin()
def get_airport_by_city_code(city_code :str):
    """
    find airport by city code

    Args:
        city_code (str): city code find by get_city_code

    Returns:
        dict: result
    """
    try:
        if caching_handler(city_code) is not None:
            return {'status': 'success', 'data': caching_handler(city_code)}
        response = requests.get("https://api.travelpayouts.com/data/en/airports.json", headers=headers).json()
        res = []
        for i in response:
            if i["city_code"] == city_code:
                res.append({
                    "code": i["code"],
                    "name": i["name"]
                })
        add_caching(city_code, res)
        return {'status': 'success', 'data': res}
    except Exception as e:
        return {'status': 'fail', 'message': str(e)}