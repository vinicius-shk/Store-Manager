const { salesService } = require('../services');

const postSales = async (req, res) => {
  const validation1 = req.body.map((obj) => Object.keys(obj).includes('quantity'));
  const validation2 = req.body.map((obj) => Object.keys(obj).includes('productId'));
  if (validation1.some((val) => val === false)) {
    return res.status(400).json({ message: '"quantity" is required' });
  } 
  if (validation2.some((val) => val === false)) {
    return res.status(400).json({ message: '"productId" is required' });
  } 
  const { type, message } = await salesService.postSales(req.body);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  postSales,
};