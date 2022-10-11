const { productsModel } = require('../models');
const productSchema = require('./validations/productSchema');

const getAll = async () => {
  const response = await productsModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await productsModel.getById(id);
  return response;
};

const postProduct = async (body) => {
  const { error } = productSchema.validate(body);
  if (error.message.includes('required')) return { type: 400, message: error.message };
  if (error.message.includes('long')) return { type: 422, message: error.message };
  const response = await productsModel.postProduct(body);
  return { type: null, message: response };
};

module.exports = {
  getAll,
  getById,
  postProduct,
};