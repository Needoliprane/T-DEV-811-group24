const EatRepository = require("./eat.repository.js");

const EatService = {
	getByCity: async (city) => await EatRepository.getByCity(city),
};

module.exports = EatService;
