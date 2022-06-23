axios = require("axios");

const EatRepository = {
	getByCity: async (city) => {
        // First api: TrueWay
        // https://rapidapi.com/trueway/api/trueway-places/
        // get coordinates of the city
        // const urlLyko = 'https://api.lyko.tech/v2.1/addresses?text='+city+'&limit=10&locale=fr'
        // const headersLyko = {"X-Api-Key": "api_1120813258"}
        // const resLyko = await axios.get(urlLyko, {headers:headersLyko})
        // const location = resLyko.data[0].location

        // const headersTrueway = {
        //     "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
        //     "X-RapidAPI-Key": "6636c7db21mshf2bc4d2c45de869p161483jsndc66b70663d9"
        // }
        // // request the restaurants with the coordinates

        // const querystring = {
        //     "location": location.lat+','+location.lng,
        //     "type": "restaurant",
        //     "radius": "15000",
        //     "language": "en"
        // }
        // const responseTrueWay = await axios.get(
        //     "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
        //     {headers:headersTrueway, params:querystring},
        // )

        // console.log(responseTrueWay.data)

        // Second api: worldwide-restaurants
        // used api doc : https://rapidapi.com/ptwebsolution/api/worldwide-restaurants/
        const headers_worldwide_restaurant = {
            'content-type': 'application/x-www-form-urlencoded',
            "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY
        }

        console.log("before restaurant id request")

        const encodedParams = new URLSearchParams();
        encodedParams.append("language", "en_US");
        encodedParams.append("q", city);

        // const encodedParams = "q="+city+"&language=en_US")

        console.log(encodedParams)
        try {
            const options = {
                method: 'POST',
                url: 'https://worldwide-restaurants.p.rapidapi.com/typeahead',
                headers: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                  'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
                },
                data: encodedParams
              };
              
              axios.request(options).then(function (response) {
                responseWorlwideRestaurant = response.data;
                  console.log(response.data.results);
              }).catch(function (error) {
                  console.error(error);
              });
            // const responseWorlwideRestaurant = await axios.post('https://worldwide-restaurants.p.rapidapi.com/typeahead',
            // data=encodedParams,
            // headers=headers_worldwide_restaurant,
            // )
            console.log(responseWorlwideRestaurant)
            return responseWorlwideRestaurant.data
        } catch(e){
            console.log(e)
            return e.data.message;
        }
	}
};

module.exports = EatRepository;
