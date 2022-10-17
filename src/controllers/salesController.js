const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const allProds = await salesService.getAll();

  res.status(200).json(allProds.message);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const { type, message } = await salesService.getById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const postSales = async (req, res) => {
  const validation1 = req.body.map((obj) => Object.keys(obj).includes('quantity'));
  const validation2 = req.body.map((obj) => Object.keys(obj).includes('productId'));
  if (validation1.some((val) => val === false)) {
    return res.status(400).json({ message: '"quantity" is required' });
  } 
  if (validation2.some((val) => val === false)) {
    return res.status(400).json({ message: '"productId" is required' });
  } 
  const { type, message } = await salesService.postSales(req.body, 'postSales');
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const validation1 = req.body.map((obj) => Object.keys(obj).includes('quantity'));
  const validation2 = req.body.map((obj) => Object.keys(obj).includes('productId'));
  if (validation1.some((val) => val === false)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (validation2.some((val) => val === false)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const id = Number(req.params.id);
  const { type, message } = await salesService.updateSale(req.body, 'updateSale', id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteProduct(id);
  if (type) return res.status(type).json({ message });
  res.status(204).end();
};

module.exports = {
  postSales,
  getAll,
  getById,
  deleteProduct,
  updateSale,
};