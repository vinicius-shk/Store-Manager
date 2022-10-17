const { salesModel } = require('../models');
const schemaValidation = require('../utils/schemaValidation');

const getAll = async () => {
  const response = await salesModel.getAll();
  return { type: null, message: response };
};

const getById = async (id) => {
  const response = await salesModel.getById(id);
  if (!response) return { type: 404, message: 'Sale not found' };
  return { type: null, message: response };
};

const postSales = async (body, modelFunc) => {
  const validation = schemaValidation(body);
  if (validation.type) return validation;

  const response = await salesModel[modelFunc](body);

  if (!response) return { type: 404, message: 'Product not found' };

  return { type: null, message: response };
};

const updateSale = async (body, modelFunc, id) => {
  const validation = schemaValidation(body);
  if (validation.type) return validation;
  const response = await salesModel[modelFunc](body, id);

  if (!response) return { type: 404, message: 'Sale not found' };

  if (response === 404) return { type: 404, message: 'Product not found' };

  return { type: null, message: response };
};

const deleteProduct = async (id) => {
  const response = await salesModel.deleteProduct(id);
  if (response.affectedRows === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: response };
};

module.exports = {
  getAll,
  getById,
  postSales,
  deleteProduct,
  updateSale,
};