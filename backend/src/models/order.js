const mongoose = require("mongoose");

const orderitemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  priceAtPurchase: Number
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [orderitemSchema],

    totalAmount: Number,

    status: {
      type: String,
      enum: ["pending", "fulfilled", "shipped", "out for delivery", "delivered", "cancelled"],
      default: "pending"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "COD"],
      default: "pending"
    },

    // Stripe payment tracking
    isPaid: {
      type: Boolean,
      default: false
    },

    paidAt: {
      type: Date
    },

    paymentResult: {
      id: String,
      status: String,
      email: String
    },

    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
