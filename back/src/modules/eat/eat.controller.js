const EatService = require("./eat.service.js");

const EatController = {
	getEatByCity: async (req,res) => {
		try {
			const addresses = await EatService.getByCity(req.params.city);
			return res.status(200).json(addresses);
		} catch (err) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}
};

module.exports = EatController;
