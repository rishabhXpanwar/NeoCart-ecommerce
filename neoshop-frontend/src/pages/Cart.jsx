import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
/* [UPDATE]: External CSS import add kiya */
import "../styles/cart.css"; 

function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    /* [UPDATE]: Empty cart ko center aur style karne ke liye wrapper add kiya */
    return (
      <div className="cart-empty-container">
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/")} className="shop-now-btn">Shop Now</button>
      </div>
    );
  }

  return (
    /* [UPDATE]: Pure layout ko 'cart-page' wrapper mein dala taaki 2-column layout ban sake */
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart ({cart.length} items)</h2>

        <div className="cart-layout">
          {/* Left Side: Cart Items List */}
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item._id} className="cart-item-card">
                <div className="item-details">
                  {/* [UPDATE]: Image div add kiya (agar product obj mein image hai) */}
                  <div className="item-img-placeholder">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                    
                    <div className="qty-controls">
                      {/* [UPDATE]: Quantity buttons ko rounded containers mein dala */}
                      <button className="qty-btn" onClick={() => updateQty(item._id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                      <span className="qty-number">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary Card [NEW SECTION] */}
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-text">FREE</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;