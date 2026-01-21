import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/api";
import "../styles/orderSuccess.css"; 

function OrderSuccess() {
  const { setCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  const clearCart = async () => {
    try {
      await api.get("/cart"); // optional, just to sync backend
      setCart([]); // frontend force clear
    } catch (err) {
      setCart([]);
    }
  };

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>

        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">
          Thank you for shopping with <strong>NeoShop</strong>. 
          We've received your order and we're getting it ready for shipment.
        </p>

        <div className="success-actions">
          <Link to="/orders" className="btn btn-secondary">
            View My Orders
          </Link>

          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>

        <p className="order-note">
          Your payment was successful and your order has been confirmed.
        </p>

      </div>
    </div>
  );
}

export default OrderSuccess;
