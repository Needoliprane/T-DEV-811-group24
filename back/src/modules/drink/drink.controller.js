const DrinkService = require("./drink.service.js");

const DrinkController = {
	getDrinkByCity: async (req,res) => {
		try {
			const addresses = await DrinkService.getByCity(req.params.city);
			return res.status(200).json(addresses);
		} catch (err) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}
};

module.exports = DrinkController;
