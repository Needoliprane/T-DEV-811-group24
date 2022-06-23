const DrinkRepository = require("./drink.repository.js");

const DrinkService = {
	getByCity: async (city) => await DrinkRepository.getByCity(city),
};

module.exports = DrinkService;
