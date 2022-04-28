import requests

class Direction:
    def __init__(self) -> None:
        self.port = "8080"
        self.host = '127.0.0.1'
        self.method = "http"
        self.url = '{}://{}:{}/api'.format(self.method, self.host, self.port)

    def get_direction(self, destination :str, origin :str) -> dict:
        """
        get direction
        
        Args:
            destination (string): destination
            origin (string): origin
        
        Returns:
            dict: res
        """
        url = self.url + '/direction/get_direction'
        response = requests.get(url, json={"departure" : origin, "destination" : destination})
        return response.json()

    def get_pos(self, destination :str) -> dict:
        """
        get pos
        
        Args:
            destination (string): destination
        
        Returns:
            dict: res
        """
        url = self.url + '/direction/get_view'
        response = requests.get(url, json={"departure" : destination})
        return response.json()

    def test1(self) -> None:
        """
        test1
        
        Raises:
            Exception: Error
        """
        res = self.get_direction("10 Rue Pierre Brossolette kremlin-bicêtre","24 rue pasteur kremlin-bicêtre")
        if res["status"] != "success":
            raise Exception("Error")

    def test2(self) -> None:
        """
        test2
        
        Raises:
            Exception: Error
        """
        res = self.get_direction("10 rue pierre brossolette kremlin-bicêtre", "24 rue pasteur kremlin-bicêtre")
        if res["status"] != "success":
            raise Exception("Error")

    def test3(self) -> None:
        """
        test3
        
        Raises:
            Exception: Error
        """
        res = self.get_pos("24 rue pasteur kremlin-bicêtre")
        if res["status"] != "success":
            raise Exception("Error")