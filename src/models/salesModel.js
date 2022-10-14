const connection = require('./database/connection');
const productsModel = require('./productsModel');

const getAll = async () => {
  const [allProds] = await connection.execute(
    `SELECT sp.sale_id AS saleId, date, sp.product_id AS productId, quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      GROUP BY sp.product_id, sale_id, quantity
      ORDER BY saleId, productId; `,
  );
  return allProds;
};

const getById = async (id) => {
  const [prodById] = await connection.execute(
    `SELECT date, sp.product_id AS productId, quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      GROUP BY sp.product_id, quantity, date
      ORDER BY productId;`,
    [id],
  );
  if (prodById.length < 1) return null;
  return prodById;
};

const postSales = async (body) => {
  const promises = body.map(({ productId }) => productsModel.getById(productId));
  const results = await Promise.all(promises);

  const validation = results.some((item) => item === undefined);
  if (validation) return null;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
  );

  await body.forEach(({ productId, quantity }) => {
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  }); 

  const response = { id: insertId, itemsSold: body };

  return response;
};

module.exports = {
  postSales,
  getAll,
  getById,
};