const SleepService = require("./sleep.service.js");

const SleepController = {
  getHotels: async (req, res) => {
    try {
      const addresses = await SleepService.getHotels(req.query);
      return res.status(200).json(addresses);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getHotelInfo: async (req, res) => {
    try {
      const details = await SleepService.getHotelInfo(req.query);
      return res.status(200).json(details);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = SleepController;
