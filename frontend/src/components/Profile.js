import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Calendar, Tag, ChevronRight } from "lucide-react";
import "./Profile.css";

function Profile() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(history);
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="profile-container">
        <header className="profile-header">
          <button className="back-link" onClick={() => navigate("/home")}>
            <ArrowLeft size={20} /> Back to Shop
          </button>
          <h1>My Account</h1>
        </header>

        <div className="profile-content">
          <section className="orders-section glass-card">
            <div className="section-title">
              <ShoppingBag size={22} color="#6366f1" />
              <h2>Order History</h2>
            </div>

            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order, index) => (
                  <div key={index} className="order-history-card">
                    <div className="order-main-info">
                      <div className="order-id-group">
                        <span className="label">Order ID</span>
                        <span className="value">{order.orderId}</span>
                      </div>
                      <div className="order-date">
                        <Calendar size={14} /> {order.date}
                      </div>
                      <div className="order-status">{order.status}</div>
                    </div>

                    <div className="order-items-preview">
                      {order.items.map((item, i) => (
                        <img key={i} src={item.image} alt={item.name} title={item.name} />
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="total-paid">
                        <Tag size={16} /> Total Paid: <strong>₹{order.total.toLocaleString()}</strong>
                      </div>
                      <button className="details-link">
                        Track Order <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-orders">
                <p>You haven't placed any orders yet.</p>
                <button onClick={() => navigate("/home")}>Start Shopping</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;