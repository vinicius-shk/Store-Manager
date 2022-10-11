const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const allProds = await productsService.getAll();

  res.status(200).json(allProds);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const result = await productsService.getById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result);
};

const postProduct = async (req, res) => {
  const { type, message } = await productsService.postProduct(req.body);
  console.log(type, message);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  postProduct,
};