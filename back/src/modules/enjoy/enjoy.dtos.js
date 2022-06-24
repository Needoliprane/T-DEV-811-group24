const Joi = require("joi");

const EnjoyDtos = {
  locationParams: Joi.object().keys({}),
  queryParams: Joi.object().keys({}),
};

module.exports = EnjoyDtos;
