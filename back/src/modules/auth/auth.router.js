const AuthController = require("./auth.controller");
const DTOValidator = require("../../middlewares/dtoValidator.middleware.js");
const AuthDtos = require("./auth.dtos.js");
const router = require("express").Router();

router.post("/login", DTOValidator.body(AuthDtos.login), AuthController.login);
router.post(
	"/sign-up",
	DTOValidator.body(AuthDtos.signUp),
	AuthController.signup
);

module.exports = router;
