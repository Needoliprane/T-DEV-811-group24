const EnjoyController = require("./enjoy.controller.js");
const EnjoyDtos = require("./enjoy.dtos.js");
const Validator = require("../../middlewares/dtoValidator.middleware");
const router = require("express").Router();

// id or query
router.get(
  "/",
  Validator.params(EnjoyDtos.queryParams),
  EnjoyController.getEventsByQuery
);

//location
router.get(
  "/:location",
  Validator.params(EnjoyDtos.locationParams),
  EnjoyController.getEventsByLocation
);
module.exports = router;
