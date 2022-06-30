const axios = require("axios");

const SleepRepository = {
	getDestinationIdBySearch: async (search) => {
        // api docs https://rapidapi.com/tipsters/api/hotels-com-provider/
        const urlHotelsCom = "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search"

        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY || null,
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }

        const params = {locale: 'fr_FR', currency: 'EUR', query: search}
        console.log('ici?')
        console.log("headers: ", headers)
        console.log("params:", params)
        try {
            const responseHotelsCom = await axios.get(
                urlHotelsCom,
                {
                    headers:headers,
                    params:params
                },
            )
            return responseHotelsCom.data
        } catch (e) {
            console.log('sleep getDestinationIdBySearch hotels com error:',e.message)
            return e.message
        }

	},
    getHotels: async (search, adults_number, checkin_date, checkout_date) => {
        const destinationsById = await SleepRepository.getDestinationIdBySearch(search)
        const destination = destinationsById.suggestions.find(elem => elem.group === 'CITY_GROUP')
        const id = destination.entities[0].destinationId

        // api docs https://rapidapi.com/tipsters/api/hotels-com-provider/
        const urlHotelsCom = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search"

        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY || null,
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }

        const params = {
            locale: 'fr_FR',
            currency: 'EUR',
            destination_id: id,
            checkin_date:checkin_date,
            checkout_date:checkout_date,
            adults_number:adults_number,
            sort_order:"STAR_RATING_HIGHEST_FIRST"
        }
        
        console.log("headers: ", headers)
        console.log("params:", params)
        try {
            const responseHotelsCom = await axios.get(
                urlHotelsCom,
                {
                    headers:headers,
                    params:params
                },
            )
            return responseHotelsCom.data
        } catch (e) {
            console.log('sleep getHotels hotels com error:',e.message)
            return e.message
        }

	},
    getHotelPhotos: async (id) => {
        // api docs https://rapidapi.com/tipsters/api/hotels-com-provider/
        const urlHotelsCom = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/photos"

        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY || null,
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }

        const params = {
            hotel_id: id,
        }

        try {
            const responseHotelsCom = await axios.get(
                urlHotelsCom,
                {
                    headers:headers,
                    params:params
                },
            )
            return responseHotelsCom.data
        } catch (e) {
            console.log('sleep getHotelInfo hotels com error:',e.message)
            return e.message
        }
    },
    getHotelInfo: async (id, adults_number, checkin_date, checkout_date) => {
        // api docs https://rapidapi.com/tipsters/api/hotels-com-provider/
        const urlHotelsCom = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details"

        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY || null,
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }

        const params = {
            locale: 'fr_FR',
            currency: 'EUR',
            hotel_id: id,
            checkin_date:checkin_date,
            checkout_date:checkout_date,
            adults_number:adults_number,
        }
        
        console.log("headers: ", headers)
        console.log("params:", params)
        try {
            const responseHotelsCom = await axios.get(
                urlHotelsCom,
                {
                    headers:headers,
                    params:params
                },
            )
            const photosResponseHotelsCom = await SleepRepository.getHotelPhotos(id)
            console.log('responseHotelsCom')
            console.log(responseHotelsCom)
            console.log('photosResponseHotelsCom')
            console.log(photosResponseHotelsCom)
            return {
                hotel_info: responseHotelsCom.data, 
                hotel_photo: photosResponseHotelsCom
            }
        } catch (e) {
            console.log('sleep getHotelInfo hotels com error:',e.message)
            return e.message
        }

	},
};

module.exports = SleepRepository;
