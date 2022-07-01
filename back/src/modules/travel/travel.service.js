const TravelRepository = require("./travel.repository.js");

const TravelService = {
	getByCity: async (location, transport_type) =>  TravelRepository.getByCity(location, transport_type),
};

module.exports = TravelService;
