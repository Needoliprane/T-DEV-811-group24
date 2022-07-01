const Joi = require('joi');

const AuthDtos = {
    login: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
    signUp: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
}

module.exports = AuthDtos;