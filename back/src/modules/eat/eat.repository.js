axios = require("axios");

const EatRepository = {
	getByCity: async (city) => {
        // Second api: worldwide-restaurants
        // used api doc : https://rapidapi.com/ptwebsolution/api/worldwide-restaurants/
        const headers_worldwide_restaurant = {
            'content-type': 'application/x-www-form-urlencoded',
            "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY
        }

        const encodedParams = new URLSearchParams();
        encodedParams.append("language", "en_US");
        encodedParams.append("q", city);

        console.log(encodedParams)
        try {
          const citiesWorlwideRestaurant = await axios.post('https://worldwide-restaurants.p.rapidapi.com/typeahead', encodedParams, {headers:headers_worldwide_restaurant})
          const cityId = citiesWorlwideRestaurant.data.results.data[0].result_object.location_id
          encodedParams.append("location_id", cityId);
          encodedParams.append("limit", 30);
          encodedParams.append("currency", "EUR");
          const responseWorlwideRestaurant = await axios.post('https://worldwide-restaurants.p.rapidapi.com/search', encodedParams, {headers:headers_worldwide_restaurant})
          return responseWorlwideRestaurant.data
        } catch(e){
            console.log(e)
            return e.data.message;
        }
	}
};

module.exports = EatRepository;
