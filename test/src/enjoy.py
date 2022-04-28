#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests

class Enjoy:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = 'localhost'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)

    def get_event_city(self, city:str) -> dict:
        """
        get event city
        
        Args:
            city (string): city code
        
        Returns:
            dict: res
        """
        url = self.url + '/enjoy/city/{}/0'.format(city)
        response = requests.get(url)
        return response.json()

    def get_event_by_id(self, event :str) -> dict:
        """
        get event by id
        
        Args:
            event (string): event id
        
        Returns:
            dict: res
        """
        url = self.url + '/enjoy/event/{}'.format(event)
        response = requests.get(url)
        return response.json()

    def search_event(self, countryCode:str, search:str) -> dict:
        """
        search event
        
        Args:
            countryCode (string): country code
            search (string): search
        
        Returns:
            dict: res
        """
        url = self.url + '/enjoy/search'
        data = {
            "countryCode": countryCode,
            "search": search
        }
        response = requests.get(url, json=data)
        return response.json()

    def test1(self):
        """
        test1
        
        Raises:
            Exception: Error
        """
        res = self.get_event_city('paris')
        if res["status"] != "success":
            raise Exception("Test1 : Error")
    
    def test2(self):
        """
        test2
        
        Raises:
            Exception: Error
        """
        res = self.get_event_city('niqutamere')
        if res["status"] != "error":
            raise Exception("Test2 : Error")

    def test3(self):
        """
        test3
        
        Raises:
            Exception: Error
        """
        res = self.get_event_by_id('rZ7SnyZ1Ad7NvM')
        if res["status"] != "success":
            raise Exception("Test3 : Error")

    def test4(self):
        """
        test4
        
        Raises:
            Exception: Error
        """
        res = self.search_event(countryCode="FR", search="Théâtre")
        if res["status"] != "success":
            raise Exception("Test4 : Error")