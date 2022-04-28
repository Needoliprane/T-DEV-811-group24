#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests

class Drink:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = 'api'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)
    
    def get_drink_status(self, city :str) -> dict:
        """
        get drink status
        
        Args:
            city (string): city code
        
        Returns:
            dict: res
        """
        url = self.url + '/drink/find_drink_by_city/{}'.format(city)
        response = requests.get(url)
        return response.json()

    def find_type_by_city(self, type :str, city :str) -> dict:
        """
        find drink by type and city
        
        Args:
            type (string): type
            city (string): city code
        
        Returns:
            dict: res
        """
        url = self.url + '/{}/by_city/{}'.format(type, city)
        response = requests.get(url)
        return response.json()


    def get_all_type(self) -> dict:
        """
        get all type
        
        Returns:
            dict: res
        """
        url = self.url + '/get_list_of_provided_services'
        response = requests.get(url)
        return response.json()

    def test1(self) -> None:
        """
        test1
        
        Raises:
            Exception: Error
        """
        res = self.get_drink_status('bordeaux')
        if res["status"] != "success":
            raise Exception("Test1 : Error")

    def test2(self) -> None:
        """
        test2
        
        Raises:
            Exception: Error
        """
        res = self.get_drink_status('0')
        if res["status"] != "success" and res["data"] != []:
            raise Exception("Test2 : Error")

    def test3(self) -> None:
        """
        test3
        
        Raises:
            Exception: Error
        """
        res = self.find_type_by_city("art_gallery", "paris")
        if res["status"] == "error" or res["data"] == []:
            raise Exception("Test3 : Error")

    def test4(self) -> None:
        """
        test4
        
        Raises:
            Exception: Error
        """
        res = self.get_all_type()
        if res["status"] != "success":
            raise Exception("Test4 : Error")