#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests


class Sleep:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = 'api'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)

    def hotel_auto(self, data: str) -> dict:
        """
        hotel auto

        Args:
            data (string): data

        Returns:
            dict: res
        """
        search = {"search": data}
        url = self.url + '/hotel/autocomplete'
        response = requests.get(url, json=search)
        return response.json()

    def hotel_destination_id(self, destination_id: str) -> dict:
        """
        hotel destination id

        Args:
            destination_id (string): destination id

        Returns:
            dict: res
        """
        dict = {
            "checkIn": "2022-06-08",
            "checkOut": "2022-06-20",
            "nbOfPerson": 2,
            "sort": "Price"
        }
        url = self.url + '/hotel_by_destinationID/{}'.format(destination_id)
        response = requests.get(url, json=dict)
        return response.json()

    def get_hotel_by_id(self, hotel_id: str) -> dict:
        """
        get hotel by id

        Args:
            hotel_id (string): hotel id

        Returns:
            dict: res
        """
        dict = {
            "checkIn": "2022-06-08",
            "checkOut": "2022-06-20",
            "nbOfPerson": 2,
            "sort": "Price"
        }
        url = self.url + '/hotel_by_id/{}'.format(hotel_id)
        response = requests.get(url, json=dict)
        return response.json()

    def test1(self) -> None:
        """
        test1

        Raises:
            Exception: Error
        """
        res = self.hotel_auto('"bordeaux"')
        if res["status"] != "success":
            raise Exception("Test1 : Error")

    def test2(self) -> None:
        """
        test2

        Raises:
            Exception: Error
        """
        res = self.hotel_auto('niquetamere')
        if res["data"] != []:
            raise Exception("Test2 : Error")

    def test3(self) -> None:
        """
        test3

        Raises:
            Exception: Error
        """
        res = self.hotel_destination_id('niquetamere')
        if res["status"] == "success":
            raise Exception("Test3 : Error")
    
    def test4(self) -> None:
        """
        test4

        Raises:
            Exception: Error
        """
        res = self.hotel_destination_id("1635224")
        if res["status"] != "success":
            raise Exception("Test4 : Error")

    def test5(self) -> None:
        """
        test5

        Raises:
            Exception: Error
        """
        res = self.get_hotel_by_id("niquetamere")
        if res["status"] == "success":
            raise Exception("Test5 : Error")

    def test6(self) -> None:
        """
        test6

        Raises:
            Exception: Error
        """
        res = self.get_hotel_by_id("806701248")
        if res["status"] != "success":
            raise Exception("Test6 : Error")