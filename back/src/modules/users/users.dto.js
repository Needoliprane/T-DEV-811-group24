const Joi = require("joi");

const UserDtos = {
	params: Joi.object().keys({
		id: Joi.string().hex().length(24).required(),
	}),
	insert: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
	}),
};

module.exports = UserDtos;
