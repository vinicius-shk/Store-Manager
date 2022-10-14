const connection = require('./database/connection');
const productsModel = require('./productsModel');
const { getAll, getById } = require('../utils/Models/querys');

const postMultipleSales = async (body) => {
  const promises = body.map(({ productId }) => productsModel.getById(productId, 'products'));
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
  postMultipleSales,
  getAll,
  getById,
};