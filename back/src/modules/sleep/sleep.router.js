const SleepController = require("./sleep.controller.js");
const Validator = require("../../middlewares/dtoValidator.middleware");
const sleepDtos = require("./sleep.dtos.js");
const router = require("express").Router();

router.get(
  "/hotels",
  Validator.query(sleepDtos.query),
  SleepController.getHotels
);
router.get("/details", SleepController.getHotelInfo);

module.exports = router;
