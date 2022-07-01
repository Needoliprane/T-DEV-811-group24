const SleepController = require("./sleep.controller.js");
const SleepDtos = require("./sleep.dtos.js");
const router = require("express").Router();

router.get("/hotels", SleepController.getHotels);
router.get("/details", SleepController.getHotelInfo);

module.exports = router;
