const Joi = require('joi');

const joiOptions = {
    convert:true, 
    abortEarly: false,
    allowUnknown: false,
    errors: {
        wrap: {
            label: false,
        }
    }
};

const DTOValidator = {
    params: (schema, options) => (req, res, next) => {
        const schemaWithAddress = Joi.object()
            .keys({
                address: Joi.string().optional(),
            })
		const { error } = schemaWithAddress.validate(req.params, {
			...joiOptions,
			...options,
		});
		if (!error) next();
		const { details } = error;
		const message = details.map((i) => `params.${i.message}`).join(', ');
		return res.status(400).json({message});
    },
}

module.exports = DTOValidator;