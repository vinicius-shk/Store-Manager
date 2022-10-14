const express = require('express');

const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/search', productsController.getByQuery);

router.get('/:id', productsController.getById);

router.post('/', productsController.postProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;