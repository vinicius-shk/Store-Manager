const querys = require('../Models/querys'); 

const getAll = async (table) => {
  const response = await querys.getAll(table);
  return { type: null, message: response };
};

const getById = async (id, table) => {
  const response = await querys.getById(id, table);
  if (!response) return { type: 404, message: 'Product not found' };
  return { type: null, message: response };
};

module.exports = {
  getAll,
  getById,
};