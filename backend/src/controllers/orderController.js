const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');

//create order frrom cart
// api : POST /api/orders/create
exports.createOrder = async (req , res , next) => {
    try{
        const { shippingAddress , paymentMethod } = req.body;

        const cart = await Cart.findOne({user : req.user._id}).populate('items.product');

        if(!cart || cart.items.length === 0)
        {
            res.status(400);
            return next(new Error ('Cart is Empty'));
        }
        // abhi orderItems crerate kr rhe hai usske bad order create krenge 
        const orderItems = cart.items.map(i => ({
            product : i.product._id,
            quantity : i.quantity,
            priceAtPurchase : i.product.price
        }));

        const totalAmount = cart.totalPrice;

        const order = await Order.create({
            user : req.user._id,
            items : orderItems,
            totalAmount,
            shippingAddress,
            paymentStatus : paymentMethod === 'COD' ? 'COD' : 'pending'
        });

        // decrease product stock for all elements of the cart as they have been ordered
        // for(const it of cart.items)
        // {
        //     const prod = await Product.findById(it.product._id);
        //     if(prod)
        //     {
        //         prod.stock =  Math.max(0, prod.stock-it.quantity);
        //         await prod.save();
        //     }

        // }// ab stock webhook me modify hoga

        //clear the cart after order is placed
        // cart.items = [];
        // cart.totalPrice=0;
        // await cart.save();

        res.status(201).json({
            success : true,
            data : order
        });
    }
    catch(err)
    {
        next(err);
    }
};


// get user Orders
//api : GET /api/orders
exports.getUserOrders = async (req ,res , next) => {
    try{
        const orders = await Order.find({user : req.user._id}).sort({createdAt : -1});

        if(!orders)
        {
            res.status(404);
            return next(new Error('No Orders Found'));
        }

        res.status(200).json({
            success : true,
            data : orders
        });
    }
    catch(err)
    {
        next(err);
    }
};



//get order by id
//api : GET /api/orders/:id
exports.getOrderById = async( req ,res , next) => {
    try{
        const order = await Order.findById(req.params.id).populate('items.product');
        //yha pr ye items order vala hai na ki cart vala

        if(!order)
        {
            res.status(404);
            return next(new Error('Order not Found'));
        }
        // other user order can only be accessed bu admin
        if(order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
        {
            res.status(403);// 403 - forbidden : means user is authenticated but not authorized
            return next(new Error('Not Authorized to access this order'));
        }

        res.status(200).json({
            success : true,
            data : order
        });
        // 200 : means ok i.e request is successful
    }
    catch(err)
    {
        next(err);
    }
};


// update order status only by admin route
// api : PUT /api/orders/:id/status
exports.updateOrder = async (req , res , next) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if(!order)
        {
            res.status(404);
            return next(new Error('Order not Found'));
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success :success,
            data : order
        });
    }
    catch(err)
    {
        next(err);
    }
};


// get all order by all users - admin only
// api : GET /api/orders/all
exports.getAllOrders = async (req ,res ,next) => {
    try{
        const orders = await Order.find().populate("user" , "name email").sort({createdAt : -1});
        res.status(200).json({
            success : true,
            data : orders
        });
    }
    catch(err)
    {
        next(err);
    }
};

