const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const { addToCart, removeFromCart, getCartItems, checkCartItem } = require('../controllers/cart-controller');

const router = express.Router();

router.post('/add', authMiddleware , addToCart);
router.post('/remove', authMiddleware , removeFromCart);
router.get('/', authMiddleware , getCartItems);
router.get('/:id',authMiddleware, checkCartItem);

module.exports = router;