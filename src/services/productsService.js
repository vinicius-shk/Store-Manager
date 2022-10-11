const { productsModel } = require('../models');

const getAll = async () => {
  const response = await productsModel.getAll();
  return response;
};

const getById = async (id) => {
  const response = await productsModel.getById(id);
  return response;
};

module.exports = {
  getAll,
  getById,
};