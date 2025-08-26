const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cart-controller');

const router = express.Router();

router.post('/add', authMiddleware , addToCart);
router.post('/remove', authMiddleware , removeFromCart);
router.get('/', authMiddleware , getCartItems);

module.exports = router;