const EnjoyService = require("./enjoy.service.js");

const EnjoyController = {
	getEnjoyBySearch: async (req,res) => {
		try {
			const addresses = await EnjoyService.getBySearch(req.params.lat, req.params.lng, req.params.country_code, req.params.search);
			return res.status(200).json(addresses);
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	getEnjoyByCityName: async (req, res) => {
		try {
			const results = await EnjoyService.getByCityName(req.params.city, req.params.page)
			return res.status(200).json(results)
		} catch (err) {
			console.log(err)
			return res.status(500).json({ message: "Internal Server Error" });
		}
	}
};

module.exports = EnjoyController;
