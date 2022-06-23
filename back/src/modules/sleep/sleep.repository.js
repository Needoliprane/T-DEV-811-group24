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
    getHotels: async (id, adults_number, checkin_date, checkout_date) => {
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
            console.log('sleep getByDestinationId hotels com error:',e.message)
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
            return responseHotelsCom.data
        } catch (e) {
            console.log('sleep getByDestinationId hotels com error:',e.message)
            return e.message
        }

	},
};

module.exports = SleepRepository;
