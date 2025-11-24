const express = require('express');
const router = express.Router();

const { createProduct , getProduct , getProductById , updateProduct , deleteProduct } = require('../controllers/productController');
const { protect , admin } = require('../middlewares/authMiddleware');

// route to create product - only admin
router.post('/' , protect , admin , createProduct);

// route to get all products - public
router.get('/', getProduct);

// route to get product by id - public
router.get('/:id', getProductById);

// route to update product - only admin
router.put('/:id' , protect , admin , updateProduct);

// route to delete product - only admin
router.delete('/:id' , protect , admin , deleteProduct);

module.exports = router;