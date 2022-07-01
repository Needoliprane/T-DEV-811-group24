const axios = require("axios");

const TravelRepository = {
	getByCity: async (location, transport_type) => {
        // get coordinates of the city using trueway_places
        // api docs  https://rapidapi.com/trueway/api/trueway-places/
        // requesting coordinates to lyko first
        const urlLyko = 'https://api.lyko.tech/v2.1/addresses?text='+location+'&limit=10&locale=fr'
        const headersLyko = {"X-Api-Key": process.env.LYKO_API_KEY}

        const resLyko = await axios.get(urlLyko, {headers:headersLyko})
        const geolocation = resLyko.data[0].location
        
        const headersTrueway = {
            "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY
        }

        // request the drink avenues with the coordinates
        const querystring = {
            "location": geolocation.lat+','+geolocation.lng,
            "type": transport_type,
            "radius": "15000",
            "language": "en"
        }
        
        try {
            const responseTrueWay = await axios.get(
                "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
                {headers:headersTrueway, params:querystring},
                // {params:querystring},
            )
            return responseTrueWay.data
        } catch (e) {
            console.log(e.message)
            return e.message
        }

	}
};

module.exports = TravelRepository;
