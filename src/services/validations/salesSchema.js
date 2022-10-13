const Joi = require('joi');

const salesSchema = Joi.object({
  quantity: Joi.number().min(1),
  productId: Joi.number().min(1),
});

module.exports = salesSchema;