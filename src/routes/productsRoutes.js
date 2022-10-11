const express = require('express');

const { productsModel } = require('../models');

const router = express.Router();

router.get('/', productsModel.getAll);

router.get('/:id', productsModel.getById);

module.exports = router;