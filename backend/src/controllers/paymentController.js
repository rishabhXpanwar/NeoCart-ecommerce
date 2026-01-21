const stripe = require("../config/stripe");
const Order = require("../models/order");

exports.createCheckoutSession = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: order.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product?.name || "Product",
          },
          unit_amount: item.priceAtPurchase * 100
        },
        quantity: item.quantity
      })),
      metadata: {
    orderId: order._id.toString(),
    userId: order.user.toString()
  },

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.CLIENT_URL}/cancel`,

      
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
};
