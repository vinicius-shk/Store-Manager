const { productsModel } = require('../models');
const productSchema = require('./validations/productSchema');
const service = require('../utils/Services/querys');

const getAll = (table) => service.getAll(table);

const getById = (id, table) => service.getById(id, table);

const postProduct = async (body) => {
  const { error } = productSchema.validate(body);
  if (error && error.message.includes('required')) return { type: 400, message: error.message };
  if (error && error.message.includes('long')) return { type: 422, message: error.message };
  const response = await productsModel.postProduct(body, 'products');
  return { type: null, message: response };
};

module.exports = {
  getAll,
  getById,
  postProduct,
};