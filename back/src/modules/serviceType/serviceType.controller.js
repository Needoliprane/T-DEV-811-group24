const ServiceTypeService = require("./serviceType.service.js");

const ServiceTypeController = {
	getServiceTypeByCity: async (req,res) => {
		try {
			const addresses = await ServiceTypeService.getByTypeAndCity(req.params.type, req.params.city);
			return res.status(200).json(addresses);
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}
};

module.exports = ServiceTypeController;
