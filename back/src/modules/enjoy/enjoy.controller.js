const EventService = require("./event.service.js");

const EnjoyController = {
  getEventsByLocation: async (req, res) => {
    try {
      const addresses = await EventService.getByLocation(req.params, req.query);
      return res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 400)
        return res.json({ message: err.data.error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getEventsByQuery: async (req, res) => {
    try {
      const results = await EventService.getBySearch(req.query);
      return res.status(200).json(results);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 400)
        return res.json({ message: err.data.error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getEventCategories: async (_, res) => {
    try {
      const results = EventService.getCategories();
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = EnjoyController;
