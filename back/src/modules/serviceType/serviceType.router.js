const ServiceTypeController = require("./serviceType.controller.js");
const ServiceTypeDtos = require('./serviceType.dtos.js');
const router = require("express").Router();

// router.post("/get", ServiceTypeDtos.params(), ServiceTypeController.get());
router.get("/:type/:city", ServiceTypeController.getServiceTypeByCity);


module.exports = router;
