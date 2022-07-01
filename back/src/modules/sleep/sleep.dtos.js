const Joi = require("joi");

const sleepDtos = {
  query: Joi.object().keys({
    search: Joi.string().required(),
    adults_number: Joi.number().integer().required(),
    checkin_date: Joi.string().required(),
    checkout_date: Joi.string().required(),
  }),
};

module.exports = sleepDtos;
