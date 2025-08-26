const express = require('express');
const { getAllProducts,getProductById,insertProducts,deleteProductById,getProductsByCategory,updateProductById, deleteMultipleProducts } = require('../controllers/product-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/adminCheck-middleware');

const router = express.Router();

router.get('/', getAllProducts);
//insert products accepts array of products in req body.
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

router.post('/',authMiddleware, adminCheck, insertProducts);
router.post('/update/:id', authMiddleware , adminCheck , updateProductById);

router.delete('/:id', authMiddleware, adminCheck, deleteProductById);
router.delete('/', authMiddleware , adminCheck , deleteMultipleProducts);

module.exports = router;