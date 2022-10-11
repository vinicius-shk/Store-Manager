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

const postProduct = async (body) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [body.name],
  );
  const newProduct = { id: insertId, ...body };
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  postProduct,
};