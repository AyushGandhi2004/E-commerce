const express = require('express');
const { getAllProducts,getProductById,insertProducts,deleteProductById,getProductsByCategory } = require('../controllers/product-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/adminCheck-middleware');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
//insert products accepts array of products in req body.
router.post('/',authMiddleware, adminCheck, insertProducts);
router.delete('/:id', authMiddleware, adminCheck, deleteProductById);
router.get('/category/:category', getProductsByCategory);

module.exports = router;