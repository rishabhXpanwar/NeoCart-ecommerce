const express = require('express');

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // this will add protect middleware to all routes below

router.post('/add' , addToCart);
router.get('/', getCart);
router.put('/update' , updateCart);
router.delete('/remove/:productId' , removeFromCart);
router.delete('/clear' , clearCart);

module.exports = router;
