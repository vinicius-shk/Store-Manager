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

const getByQuery = async (q) => {
  const [result] = await connection.execute(
    `SELECT * FROM products WHERE name LIKE '%${q}%'`,
  );
  return result;
};

const postProduct = async (body) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [body.name],
  );
  const newProduct = { id: insertId, ...body };
  return newProduct;
};

const updateProduct = async (body, id) => {
  const [result] = await connection.execute(
    `UPDATE products
      SET name = ?
      WHERE id = ?;`,
    [body.name, id],
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM products
      WHERE id = ?;`,
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  postProduct,
  updateProduct,
  deleteProduct,
  getByQuery,
};