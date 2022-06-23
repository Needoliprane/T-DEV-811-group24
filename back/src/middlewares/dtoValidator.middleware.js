const Joi = require("joi");

const joiOptions = {
	convert: true,
	abortEarly: false,
	allowUnknown: false,
	errors: {
		wrap: {
			label: false,
		},
	},
};

const DTOValidator = {
	body: (schema, options) => (req, res, next) => {
		const schemaWithUser = Joi.object()
			.keys({
				user: Joi.object()
					.keys({
						role: Joi.string().valid("user", "admin").required(),
						id: Joi.number().min(1).required(),
						firstName: Joi.string().required(),
						lastName: Joi.string().required(),
					})
					.unknown(true),
				body: schema.required(),
			})
			.unknown(true);
		const { error } = schemaWithUser.validate(req, {
			...joiOptions,
			...options,
		});
		if (error) {
			const { details } = error;
			const message = details.map((i) => i.message).join(", ");
			return res.status(400).json({ message });
		}
		next();
	},
	params: (schema, options) => (req, res, next) => {
		const { error } = schema.validate(req.params, {
			...joiOptions,
			...options,
		});
		if (!error) return next();
		const { details } = error;
		const message = details.map((i) => `params.${i.message}`).join(", ");
		return res.status(400).json({ message });
	},
	query: (schema, options) => (req, res, next) => {
		const schemaWithUser = Joi.object()
			.keys({
				user: Joi.object()
					.keys({
						roles: Joi.array()
							.items(Joi.string().valid("manager", "admin", "trainer"))
							.required(),
						id: Joi.number().min(1).required(),
					})
					.unknown(true),
				query: schema.required(),
			})
			.unknown(true);
		const { error } = schemaWithUser.validate(req, {
			...joiOptions,
			...options,
		});
		if (!error) next();
		const { details } = error;
		const message = details.map((i) => `params.${i.message}`).join(", ");
		return res.status(400).json({ message });
	},
};

module.exports = DTOValidator;
