const { productsService } = require('../services');
const controller = require('../utils/Controller/querys');

const getAll = (_req, res) => controller.getAll(_req, res, 'products');

const getById = (_req, res) => controller.getById(_req, res, 'products');

const postProduct = async (req, res) => {
  const { type, message } = await productsService.postProduct(req.body);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  postProduct,
};