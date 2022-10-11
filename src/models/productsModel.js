const connection = require('./database/connection');

const getAll = async () => {
  const [allProds] = await connection.execute(
    'SELECT * FROM products',
  );
  return allProds;
};

const getById = async (id) => {
  const [[prodById]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return prodById;
};

module.exports = {
  getAll,
  getById,
};