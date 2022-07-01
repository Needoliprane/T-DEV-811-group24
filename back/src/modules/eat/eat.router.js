const EatController = require("./eat.controller.js");
const EatDtos = require('./eat.dtos.js');
const router = require("express").Router();

// router.post("/get", EatDtos.params(), EatController.get());
router.get("/find_restaurant_by_city/:city", EatController.getEatByCity);


module.exports = router;
