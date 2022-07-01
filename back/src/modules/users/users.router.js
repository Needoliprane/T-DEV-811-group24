const UsersController = require("./users.controller");
const DTOValidator = require("../../middlewares/dtoValidator.middleware.js");
const UserDtos = require("./users.dto.js");
const router = require("express").Router();

router.get("/", UsersController.getAll);
router.post("/", DTOValidator.body(UserDtos.insert), UsersController.insert);
router.delete(
	"/:id",
	DTOValidator.params(UserDtos.params),
	UsersController.delete
);

module.exports = router;
