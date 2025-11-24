const express = require('express');

const router = express.Router();

const { createOrder , getUserOrders, getAllOrders, getOrderById , updateOrder } = require('../controllers/orderController');

const { protect , admin } = require('../middlewares/authMiddleware');

//route to create order
router.post('/create' , protect , createOrder);

//route to get orders of logged in user
router.get('/' , protect , getUserOrders);


// get all orders by all users - admin only
router.get('/all' , protect , admin , getAllOrders);



// get order by id - only admin and user who placed the order
router.get('/:id' , protect , getOrderById);

// update order status only by admin
router.put('/:id/status' , protect , admin , updateOrder);


module.exports = router;