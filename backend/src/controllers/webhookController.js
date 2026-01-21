const stripe = require("../config/stripe");
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.stripeWebhook = async (req, res) => {
    //console.log(" WEBHOOK HIT");

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    //console.log("SESSION METADATA:", session.metadata);


    const orderId = session.metadata.orderId;

    const order = await Order.findById(orderId);

    if (order && !order.isPaid) {
        //console.log("ORDER FOUND:", order?._id);

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentStatus = "paid";

      await order.save();

      // reduce stock
      for (const item of order.items) {
        const prod = await Product.findById(item.product);
        if (prod) {
          prod.stock = Math.max(0, prod.stock - item.quantity);
          await prod.save();
        }
      }

      // clear cart
      await Cart.findOneAndUpdate(
        { user: order.user },
        { items: [], totalPrice: 0 }
      );
    }
  }

  res.json({ received: true });
};
