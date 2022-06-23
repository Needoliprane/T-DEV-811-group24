const EnjoyRepository = require("./enjoy.repository.js");
const geohash = require('ngeohash');

const EnjoyService = {
	getBySearch: async (lat, lng, country_code, search) => {
		const geoHash = geohash.encode(lat, lng)
		return await EnjoyRepository.getBySearch(geoHash, country_code, search)
	},
	getByCityName: async(city, page) => EnjoyRepository.getByCityName(city, page)
};

module.exports = EnjoyService;
