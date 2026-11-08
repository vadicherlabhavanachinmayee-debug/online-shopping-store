import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Banknote, Globe, ArrowLeft, Trash2, MapPin } from "lucide-react";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { product, items } = location.state || {};
  const [checkoutItems, setCheckoutItems] = useState(items || (product ? [product] : []));
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Shipping State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  const grandTotal = checkoutItems.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const removeItem = (index) => {
    setCheckoutItems(checkoutItems.filter((_, i) => i !== index));
  };

  const placeOrder = () => {
    // Basic validation
    if (Object.values(address).some(val => val === "")) {
      alert("Please fill in all shipping details!");
      return;
    }
    if (checkoutItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(
      `🎉 Order Placed Successfully!\n\n` +
      `Deliver to: ${address.fullName}\n` +
      `Address: ${address.street}, ${address.city} - ${address.pincode}\n` +
      `Total: ₹${grandTotal.toLocaleString()}\n` +
      `Payment: ${paymentMethod}`
    );
    navigate("/home");
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="empty-payment">
        <h2>Your checkout is empty</h2>
        <button className="back-btn" onClick={() => navigate("/home")}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <header className="payment-header">
          <button className="back-link" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back
          </button>
          <h1>Complete Your Purchase</h1>
        </header>

        <div className="payment-grid">
          {/* Left Column: Shipping & Summary */}
          <div className="left-column">
            {/* Shipping Form */}
            <div className="shipping-form glass-card">
              <div className="section-title">
                <MapPin size={20} color="#6366f1" />
                <h2>Shipping Address</h2>
              </div>
              <div className="form-group">
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} />
              </div>
              <input type="text" name="street" placeholder="Street Address / House No." onChange={handleInputChange} />
              <div className="form-group">
                <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
                <input type="text" name="pincode" placeholder="Pincode" onChange={handleInputChange} />
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary glass-card">
              <h2>Order Summary</h2>
              <div className="items-list">
                {checkoutItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-price">₹{item.price.toLocaleString()}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(index)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="grand-total">
                <span>Total Amount:</span>
                <span>₹${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Methods */}
          <div className="right-column">
            <div className="payment-methods glass-card">
              <h2>Payment Method</h2>
              <div className="method-options">
                <label className={`method-label ${paymentMethod === "UPI" ? "active" : ""}`}>
                  <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <Smartphone className="method-icon" color="#6366f1" />
                  <span>UPI (GPay / PhonePe)</span>
                </label>

                <label className={`method-label ${paymentMethod === "Card" ? "active" : ""}`}>
                  <input type="radio" value="Card" checked={paymentMethod === "Card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <CreditCard className="method-icon" color="#ff00ff" />
                  <span>Debit / Credit Card</span>
                </label>

                <label className={`method-label ${paymentMethod === "COD" ? "active" : ""}`}>
                  <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <Banknote className="method-icon" color="#fbef34" />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              <button className="confirm-btn" onClick={placeOrder}>
                Place Order • ₹{grandTotal.toLocaleString()}
              </button>
              <p className="secure-text">🔒 Secure 256-bit SSL Encrypted Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;