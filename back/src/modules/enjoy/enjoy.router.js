const EnjoyController = require("./enjoy.controller.js");
const EnjoyDtos = require("./enjoy.dtos.js");
const Validator = require("../../middlewares/dtoValidator.middleware");
const router = require("express").Router();

// id or query
router.get(
  "/",
  Validator.query(EnjoyDtos.searchByQueryQuery),
  EnjoyController.getEventsByQuery
);

router.get("/categories", EnjoyController.getEventCategories);

//location
router.get(
  "/:location",
  Validator.params(EnjoyDtos.getByLocationParams),
  Validator.query(EnjoyDtos.getByLocationQuery),
  EnjoyController.getEventsByLocation
);

module.exports = router;
