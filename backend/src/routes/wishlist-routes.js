const express = require('express');
const { getWishlistItems, addToWishlist, removeFromWishlist, checkWishlist } = require('../controllers/wishlist-controller');
const authMiddleware = require('../middlewares/auth-middleware');



const router = express.Router();

router.get('/',authMiddleware , getWishlistItems);
router.get('/:id',authMiddleware,checkWishlist);
router.post('/add',authMiddleware , addToWishlist);
router.post('/remove',authMiddleware , removeFromWishlist);

module.exports = router;