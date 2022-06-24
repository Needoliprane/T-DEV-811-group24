const EnjoyService = require("./enjoy.service.js");

const EnjoyController = {
  getEventsByLocation: async (req, res) => {
    try {
      const addresses = await EnjoyService.getBySearch(req.params);
      return res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getEventsByQuery: async (req, res) => {
    try {
      const results = await EventService.getEventsByQuery(req.params);
      return res.status(200).json(results);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = EnjoyController;
