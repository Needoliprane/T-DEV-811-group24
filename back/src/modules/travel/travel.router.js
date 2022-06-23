const TravelController = require("./travel.controller.js");
const TravelDtos = require('./travel.dtos.js');
const router = require("express").Router();

router.get("/", TravelController.getTravelByCity)

module.exports = router;
