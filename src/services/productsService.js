const { productsModel } = require('../models');

const getAll = async () => {
  const response = await productsModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await productsModel.getById(id);
  return response;
};

const postProduct = async (body) => {
  const response = await productsModel.postProduct(body);
  return response;
};

module.exports = {
  getAll,
  getById,
  postProduct,
};