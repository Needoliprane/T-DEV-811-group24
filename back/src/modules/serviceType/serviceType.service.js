const ServiceTypeRepository = require("./serviceType.repository.js");

const ServiceTypeService = {
	getByTypeAndCity: async (type, city) => await ServiceTypeRepository.getByTypeAndCity(type, city),
};

module.exports = ServiceTypeService;
