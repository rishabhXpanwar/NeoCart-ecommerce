const mongoose = require('mongoose');

const orderitemSchema = new mongoose.Schema ({
    product : { type : mongoose.Schema.Types.ObjectId , ref : 'Product'},
    quantity : Number,
    priceAtPurchase : Number
});

const orderSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    items : [orderitemSchema],
    totalAmount : Number,
    status : {type : String , enum : ['pending', 'fulfilled', 'shipped', 'out for delivery', 'delivered' , 'cancelled'], default : 'pending'},
    paymentStatus : {type : String , enum : ['pending', 'paid', 'COD'], default : 'pending'},
    shippingAddress : String},
    {

    timestamps : true
});

module.exports = mongoose.model('Order' , orderSchema);