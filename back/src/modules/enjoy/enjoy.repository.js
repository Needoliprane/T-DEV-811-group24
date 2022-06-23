axios = require("axios");

const EnjoyRepository = {
	getBySearch: async (geohash, country_code, search) => {
        // api docs https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#find-suggest-10-v2
        const urlTicketMaster = "https://app.ticketmaster.com/discovery/v2/suggest?apikey="+process.env.TICKETMASTER_API_KEY

        // request the enjoy avenues with the coordinates
        const querystring = {
            "keyword": search,
            "unit": "km",
            "radius": "10",
            "geoPoint": geohash,
            "countryCode": country_code,
        }
        
        try {
            const responseTicketMaster = await axios.get(
                urlTicketMaster,
                {params:querystring},
            )
            return responseTicketMaster.data
        } catch (e) {
            console.log(e.message)
            return e.message
        }

	},
    getByCityName: async (city, page) => {
        const urlTicketMaster = "https://app.ticketmaster.com/discovery/v2/events?apikey="+process.env.TICKETMASTER_API_KEY

        const querystring = {
            "city": city,
            "page": page,
            "size": 20
        }

        try {
            const responseTicketMaster = await axios.get(
                urlTicketMaster,
                {params:querystring},
            )
            return responseTicketMaster.data
        } catch (e) {
            console.log("service error: ",e.message)
            return e.message
        }
    },
    getByEventId: async(eventId) => {
        const urlTicketMaster = "https://app.ticketmaster.com/discovery/v2/events/"+eventId+"?apikey="+process.env.TICKETMASTER_API_KEY

        const querystring = {
            "city": city,
            "page": page,
            "size": 20
        }

        try {
            const responseTicketMaster = await axios.get(
                urlTicketMaster,
                {params:querystring},
            )
            return responseTicketMaster.data
        } catch (e) {
            console.log("service error: ",e.message)
            return e.message
        }
    }
};

module.exports = EnjoyRepository;
