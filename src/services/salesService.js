const { salesModel } = require('../models');
const salesSchema = require('./validations/salesSchema');
const service = require('../utils/Services/querys');

const postMultipleSales = async (body) => {
  const validation = body.reduce((acc, cur) => { 
    const { error } = salesSchema.validate(cur);
    if (error) return [...acc, error];
    return [...acc];
  }, []);

  if (validation.length >= 1) return { type: 422, message: validation[0].message };

  const response = await salesModel.postMultipleSales(body);

  if (!response) return { type: 404, message: 'Product not found' };

  return { type: null, message: response };
};

const getAll = () => service.getAll('sales');

const getById = (id) => service.getById(id, 'sales');

module.exports = {
  postMultipleSales,
  getAll,
  getById,
};