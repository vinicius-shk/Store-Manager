const service = require('../Services/querys');

const getAll = async (_req, res, table) => {
  const allProds = await service.getAll(table);

  res.status(200).json(allProds.message);
};

const getById = async (req, res, table) => {
  const id = Number(req.params.id);

  const { type, message } = await service.getById(id, table);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

// const postProduct = async (req, res) => {
//   const { type, message } = await service.postProduct(req.body);
//   if (type) return res.status(type).json({ message });
//   res.status(201).json(message);
// };

module.exports = {
  getAll,
  getById,
  // postProduct,
};