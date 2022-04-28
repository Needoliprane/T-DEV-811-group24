
import requests

def get_pos(departure):
    try:
        departure = departure.replace(" ", "%20")
        print("dep", departure)
        jsonDeparture = requests.get("https://api-adresse.data.gouv.fr/search/?q=" + departure +"&type=housenumber&autocomplete=1").json()
        cordinateDeparture = jsonDeparture["features"][0]["geometry"]["coordinates"]
        print(cordinateDeparture)
        link = "https://www.openstreetmap.org/export/embed.html?bbox=" + str(cordinateDeparture[0]) + "%2C" + str(cordinateDeparture[1]) + \
                "%2C" + str(cordinateDeparture[0]) + "%2C" + str(cordinateDeparture[1]) + "&amp;layer=mapnik"
        return {"status" : "ok", "link" : link}
    except Exception as e:
        print(e)
        return {"status" : "error", "message" : str(e)}

def direction(departure, destination):
        try:
            departure = departure.replace(" ", "%20")
            destination = destination.replace(" ", "%20")

            print(departure, destination)
            jsonDeparture = requests.get("https://api-adresse.data.gouv.fr/search/?q=" + departure +"&type=housenumber&autocomplete=1").json()
            cordinateDeparture = jsonDeparture["features"][0]["geometry"]["coordinates"]

            jsonDestination = requests.get("https://api-adresse.data.gouv.fr/search/?q=" + destination +"&type=housenumber&autocomplete=1").json()
            cordinateDestination = jsonDestination["features"][0]["geometry"]["coordinates"]

            link = "https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=" + str(cordinateDeparture[1]) \
                + "%2C" + str(cordinateDeparture[0]) +"%3B" + str(cordinateDestination[1]) + "%2C" + str(cordinateDestination[0]) + "#map=13/"

            print('link', link)
            return {"status" : "ok", "link" : link}
        except Exception as e:
            print("link error")
            return {"status" : "error", "message" : str(e)}


print(get_pos("11 rue des suisses garches"))
print(direction("11 rue des suisses garches", "24 rue pasteur kremlin-bicêtre"))