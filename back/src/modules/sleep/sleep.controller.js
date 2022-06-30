const SleepService = require("./sleep.service.js");

const SleepController = {
	getDestinationIdBySearch: async (req,res) => {
		try {
			const destinations = await SleepService.getDestinationIdBySearch(req.params.search);
			return res.status(200).json(destinations);
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	getHotels: async (req,res) => {
		try {
			const search = req.query.search
			const adults_number = req.query.adults_number
			const checkin_date = req.query.checkin_date
			const checkout_date = req.query.checkout_date
			
			const addresses = await SleepService.getHotels(search, adults_number, checkin_date, checkout_date);
			return res.status(200).json(addresses);
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	getHotelInfo: async (req,res) => {
		try {
			console.log("controller params: ",req.query)
			const id = req.query.id
			const adults_number = req.query.adults_number
			const checkin_date = req.query.checkin_date
			const checkout_date = req.query.checkout_date

			const details = await SleepService.getHotelInfo(id, adults_number, checkin_date, checkout_date);
			return res.status(200).json(details);
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
};

module.exports = SleepController;
