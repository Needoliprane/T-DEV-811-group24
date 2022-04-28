#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests

class Eat:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = 'api'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)

    def get_eat_status(self, city :str) -> dict:
        """
        get eat status

        Args:
            city (string): city code

        Returns:
            dict: res
        """
        url = self.url + '/eat/city_id//{}'.format(city)
        response = requests.get(url)
        return response.json()

    def get_restaurant_by_city_id(self, city_id :str) -> dict:
        """
        get restaurant by city id

        Args:
            city_id (string): city id

        Returns:
            dict: res
        """
        url = self.url + '/eat/restaurant/{}'.format(city_id)
        response = requests.get(url)
        return response.json()

    def test1(self) -> None:
        """
        test1

        Raises:
            Exception: Error
        """
        res = self.get_eat_status('paris')
        if res["status"] != "success":
            raise Exception("Test1 : Error")

    def test2(self) -> None:
        """
        test2

        Raises:
            Exception: Error
        """
        res = self.get_eat_status('0')
        if res["status"] != "error":
            raise Exception("Test2 : Error")

    def test3(self) -> None:
        """
        test3

        Raises:
            Exception: Error
        """
        res = self.get_restaurant_by_city_id('0')
        if res["status"] == "success":
            raise Exception("Test3 : Error")
    
    def test4(self) -> None:
        """
        test4

        Raises:
            Exception: Error
        """
        res = self.get_restaurant_by_city_id('187079')
        if res["status"] != "success":
            raise Exception("Test4 : Error")
