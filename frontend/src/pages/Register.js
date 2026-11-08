import { useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import "./Register.css"; // reuse same CSS for consistency
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      setMessage({ text: "Account created! Redirecting to login…", type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage({ text: "User already exists or error occurred", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="login-glass-card">
        <div className="login-header">
          <div className="brand-icon">
            <ShoppingBag size={32} color="#6366f1" strokeWidth={2.5} />
          </div>
          <h1>Create Account</h1>
          <p>Start your shopping journey with us.</p>
        </div>

        {message.text && (
          <div className={`alert-box ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            <span>{isLoading ? "Creating..." : "Create Account"}</span>
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
