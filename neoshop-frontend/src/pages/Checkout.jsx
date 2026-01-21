import { useState } from "react";
import { createStripeSession } from "../api/payment";
import { placeOrderApi } from "../api/order";
import { useCart } from "../context/CartContext";
/* [UPDATE]: CSS import add kiya */
import "../styles/checkout.css"; 

function Checkout() {
  const { cart, total } = useCart(); // [UPDATE]: total bhi nikal liya summary ke liye

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const checkoutHandler = async () => {
    try {
      if (cart.length === 0) return alert("Cart is empty");
      
      /* [UPDATE]: Basic validation check */
      if(!address.fullName || !address.address) return alert("Please fill shipping details");

      const orderRes = await placeOrderApi({
        shippingAddress: address,
        paymentMethod: "CARD"
      });

      const orderId = orderRes.data._id;
      const stripeRes = await createStripeSession(orderId);
      window.location.href = stripeRes.url;

    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    /* [UPDATE]: Pure layout ko checkout-container mein dala */
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* Left Side: Shipping Form */}
        <div className="checkout-form-section">
          <h2 className="section-title">Shipping Information</h2>
          <div className="form-grid">
            <div className="input-group full-width">
              <label>Full Name</label>
              <input name="fullName" placeholder="John Doe" onChange={handleChange} />
            </div>
            <div className="input-group full-width">
              <label>Street Address</label>
              <input name="address" placeholder="House No, Street, Area" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>City</label>
              <input name="city" placeholder="Mumbai" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Postal Code</label>
              <input name="postalCode" placeholder="400001" onChange={handleChange} />
            </div>
            <div className="input-group full-width">
              <label>Country</label>
              <input name="country" placeholder="India" onChange={handleChange} />
            </div>
          </div>
          <button className="payment-btn" onClick={checkoutHandler}>
            Proceed to Secure Payment
          </button>
        </div>

        {/* Right Side: Order Summary [NEW SECTION] */}
        <div className="checkout-summary-section">
          <h3 className="summary-title">Order Summary</h3>
          <div className="mini-product-list">
            {cart.map(item => (
              <div key={item._id} className="mini-item">
                <span>{item.name} <small>x{item.qty}</small></span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-total">
            <span>Amount to Pay:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="secure-text">🔒 128-bit SSL Secure Checkout</p>
        </div>

      </div>
    </div>
  );
}

export default Checkout;