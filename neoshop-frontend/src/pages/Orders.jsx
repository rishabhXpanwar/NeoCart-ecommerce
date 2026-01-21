import { useEffect, useState } from "react";
import { getMyOrdersApi } from "../api/order";
import { Link } from "react-router-dom";
/* [UPDATE]: CSS import add kiya */
import "../styles/orders.css"; 

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getMyOrdersApi();
    setOrders(data.data);
  };

  return (
    /* [UPDATE]: Layout ko 'orders-container' wrapper mein dala */
    <div className="orders-page">
      <div className="orders-container">
        <header className="orders-header">
          <h2>My Orders</h2>
          <p>Track and manage your recent purchases</p>
        </header>

        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              /* [UPDATE]: Card structure ko improve kiya classes ke sath */
              <div key={order._id} className="order-card">
                <div className="order-main-info">
                  <div className="order-id-group">
                    <span className="label">Order ID</span>
                    <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  
                  <div className="order-stat-group">
                    <span className="label">Total Amount</span>
                    <span className="value price">₹{order.totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="order-stat-group">
                    <span className="label">Status</span>
                    {/* [UPDATE]: Dynamic class status color ke liye */}
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-action">
                  <Link to={`/orders/${order._id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">
              <p>You haven't placed any orders yet.</p>
              <Link to="/" className="shop-link">Start Shopping</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;