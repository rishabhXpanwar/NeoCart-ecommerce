import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; /* [UPDATE]: useNavigate add kiya back button ke liye */
import { getOrderByIdApi } from "../api/order";
/* [UPDATE]: CSS import add kiya */
import "../styles/orderDetails.css"; 

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const data = await getOrderByIdApi(id);
      setOrder(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <div className="loader-container"><h2>Loading Order Details...</h2></div>;

  return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        {/* [UPDATE]: Header with back button and status */}
        <div className="order-detail-header">
          <button className="back-btn" onClick={() => navigate("/orders")}>← Back to Orders</button>
          <div className="header-flex">
            <h1>Order Receipt</h1>
            <span className={`status-pill ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <p className="order-id-text">ID: {order._id}</p>
        </div>

        {/* [UPDATE]: Items Table style layout */}
        <div className="order-items-section">
          <h3>Items Purchased</h3>
          <div className="items-list">
            {order.items.map((i, index) => (
              <div key={index} className="detail-item-row">
                <div className="item-info-main">
                  <p className="item-name">{i.product?.name || "Premium Product"}</p>
                  <p className="item-meta">Price: ₹{i.priceAtPurchase.toLocaleString()}</p>
                </div>
                <div className="item-qty-total">
                  <span className="qty-tag">qty: {i.quantity}</span>
                  <span className="subtotal">₹{(i.priceAtPurchase * i.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* [UPDATE]: Billing Summary Section */}
        <div className="order-summary-footer">
          <div className="billing-details">
            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
            <div className="bill-row">
              <span>Tax (GST)</span>
              <span>Included</span>
            </div>
            <div className="bill-row total-bill">
              <span>Amount Paid</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="support-footer">
          <p>Need help with this order? <span className="contact-link">Contact Support</span></p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;