const express = require('express');
const { fetchSearchedProducts } = require('../controllers/search-controllers');
const router = express.Router();

router.get('/:input', fetchSearchedProducts);

module.exports = router;