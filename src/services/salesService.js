const { salesModel } = require('../models');
const salesSchema = require('./validations/salesSchema');

const postSales = async (body) => {
  const validation = body.reduce((acc, cur) => { 
    const { error } = salesSchema.validate(cur);
    if (error) return [...acc, error];
    return [...acc];
  }, []);

  if (validation.length >= 1) return { type: 422, message: validation[0].message };

  const response = await salesModel.postSales(body);

  if (!response) return { type: 404, message: 'Product not found' };

  return { type: null, message: response };
};

module.exports = {
  postSales,
};