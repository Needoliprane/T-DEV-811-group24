#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests


class Covid:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = 'api'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)

    def get_covid_status(self, country :str) -> dict:
        """
        get covid status

        Args:
            country (string): country code

        Returns:
            dict: res
        """
        url = self.url + '/covid/get_stat_by_country/{}'.format(country)
        response = requests.get(url)
        return response.json()

    def test1(self) -> None:
        """
        test1

        Raises:
            Exception: Error
        """
        res = self.get_covid_status('ES')
        if res["status"] != "success":
            raise Exception("Test1 : Error")

    def test2(self) -> None:
        """
        test2

        Raises:
            Exception: Error
        """
        res = self.get_covid_status('0')
        if res["status"] != "error":
            raise Exception("Test2 : Error")