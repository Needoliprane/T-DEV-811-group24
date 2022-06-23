const DrinkController = require("./drink.controller.js");
const DrinkDtos = require('./drink.dtos.js');
const router = require("express").Router();

// router.post("/get", DrinkDtos.params(), DrinkController.get());
router.get("/find_drink_by_city/:city", DrinkController.getDrinkByCity);


module.exports = router;
