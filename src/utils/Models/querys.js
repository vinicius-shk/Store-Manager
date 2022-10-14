const connection = require('../../models/database/connection');

const getAll = async (table) => {
  const [allProds] = await connection.execute(
    `SELECT * FROM ${table}`,
  );
  return allProds;
};

const getById = async (id, table) => {
  const [[prodById]] = await connection.execute(
    `SELECT * FROM ${table} WHERE id = ?`,
    [id],
  );
  return prodById;
};

const postProduct = async (body, table) => {
  const columns = Object.keys(body)
    .map((key) => `${key}`)
    .join(', ');
  
  const placeholders = Object.keys(body)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
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