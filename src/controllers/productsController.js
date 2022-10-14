const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const allProds = await productsService.getAll();

  res.status(200).json(allProds.message);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const { type, message } = await productsService.getById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const { type, message } = await productsService.postProduct(req.body);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.updateProduct(req.body, id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  postProduct,
  updateProduct,
};