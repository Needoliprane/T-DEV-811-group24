const TravelService = require("./travel.service.js");

const TravelController = {
	getTravelByCity: async (req,res) => {
		try {
			const location = req.query.location
			const transport_type = req.query.transport_type
			
			const addresses = await TravelService.getByCity(location, transport_type);
			return res.status(200).json(addresses);
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}
};

module.exports = TravelController;
