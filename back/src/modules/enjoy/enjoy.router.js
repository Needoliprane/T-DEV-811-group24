const EnjoyController = require("./enjoy.controller.js");
const EnjoyDtos = require('./enjoy.dtos.js');
const router = require("express").Router();

router.get("/search", EnjoyController.getEnjoyBySearch);
router.get("/city/:city/:page", EnjoyController.getEnjoyByCityName)

module.exports = router;
