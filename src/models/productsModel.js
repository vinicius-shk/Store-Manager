const connection = require('./database/connection');

const getAll = async (_req, res) => {
  const [allProds] = await connection.execute(
    'SELECT * FROM products',
  );

  res.status(200).json(allProds);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const [prodById] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  if (prodById.length < 1) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(prodById[0]);
};

module.exports = {
  getAll,
  getById,
};