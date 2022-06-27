const Joi = require("joi");

const EnjoyDtos = {
  getByLocationParams: Joi.object().keys({
    location: Joi.string().required(),
  }),
  getByLocationQuery: Joi.object().keys({
    radius: Joi.number().integer().min(1).optional(),
    page: Joi.number().integer().min(0).optional(),
    category: Joi.string().optional(),
  }),
  searchByQueryQuery: Joi.object()
    .keys({
      q: Joi.string(),
      id: Joi.string(),
      page: Joi.number().integer().min(0).optional(),
      country: Joi.string().optional(),
      category: Joi.string().optional(),
    })
    .nand("q", "id")
    .or("q", "id"),
};

module.exports = EnjoyDtos;
