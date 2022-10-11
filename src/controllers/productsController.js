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

module.exports = {
  getAll,
  getById,
};