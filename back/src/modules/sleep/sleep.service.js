const SleepRepository = require("./sleep.repository.js");

const SleepService = {
	getDestinationIdBySearch: async (search) =>  SleepRepository.getDestinationIdBySearch(search),
	getHotels: async (search, adults_number, checkin_date, checkout_date) => SleepRepository.getHotels(search, adults_number, checkin_date, checkout_date),
	getHotelInfo: async (id, adults_number, checkin_date, checkout_date) => SleepRepository.getHotelInfo(id, adults_number, checkin_date, checkout_date)
};

module.exports = SleepService;
