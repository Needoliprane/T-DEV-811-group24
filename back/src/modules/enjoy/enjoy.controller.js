const EventService = require("./event.service.js");
const config = require("../../config/server.config");
const { json } = require("express");

const EnjoyController = {
  getEventsByLocation: async (req, res) => {
    try {
      const addresses = await EventService.getByLocation(req.params, req.query);
      console.log(config.apis.predictHq.apiKey);
      let str = "";
      for (let i = 0; i < config.apis.predictHq.apiKey.length; ++i)
        str = `${str}.${config.apis.predictHq.apiKey[i]}`;
      console.log(str);
      return res.status(200).json(str);
    } catch (err) {
      return res.json(err);
      console.error(err);
      if (err?.response?.status === 400)
        return res.json({ message: err.data.error });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getEventsByQuery: async (req, res) => {
    try {
      const results = await EventService.getBySearch(req.query);
      for (let i = 0; i < config.apis.predictHq.apiKey.length; ++i)
        str = `${str}.${config.apis.predictHq.apiKey[i]}`;
      console.log(str);
      return res.status(200).json(str);
    } catch (err) {
      return res.json(err);
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
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = EnjoyController;
