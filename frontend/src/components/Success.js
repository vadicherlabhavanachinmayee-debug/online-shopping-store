import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Home as HomeIcon, Download } from "lucide-react";
import "./Success.css";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, total, items } = location.state || {};

  useEffect(() => {
    if (address && items) {
      // Save order to history
      const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
      const newOrder = {
        orderId: "USB-" + Math.random().toString(36).toUpperCase().substring(2, 10),
        date: new Date().toLocaleDateString(),
        total: total,
        items: items,
        status: "Confirmed"
      };
      localStorage.setItem("orderHistory", JSON.stringify([newOrder, ...existingOrders]));
    }
  }, [address, items, total]);

  if (!address) return <div className="loader-screen">Redirecting...</div>;

  return (
    <div className="success-wrapper">
      <div className="success-card glass-card">
        <CheckCircle size={80} color="#00ffcc" />
        <h1>Order Successful!</h1>
        <p>Your items are being prepared for shipping.</p>
        
        <div className="success-actions">
          <button className="home-redirect" onClick={() => navigate("/home")}>
            Continue Shopping
          </button>
          <button className="receipt-btn" onClick={() => navigate("/profile")}>
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;