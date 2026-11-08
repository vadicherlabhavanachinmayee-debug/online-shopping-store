import { useState } from "react";
import { loginUser } from "../services/authService";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const data = await loginUser({ email, password });

      // ✅ Save JWT token
      localStorage.setItem("token", data.token);

      setMessage({
        text: "Success! Redirecting...",
        type: "success"
      });

      // ✅ Redirect to Home page
      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (error) {
      setMessage({
        text: "Access Denied. Check your credentials.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Decorative background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="login-glass-card">
        <div className="login-header">
          <div className="brand-icon">
            <ShoppingBag size={32} color="#6366f1" strokeWidth={2.5} />
          </div>
          <h1>Welcome Back</h1>
          <p>The best deals are waiting for you.</p>
        </div>

        {message.text && (
          <div className={`alert-box ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
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
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <span
              className="pwd-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            <span>{isLoading ? "Verifying..." : "Sign In"}</span>
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Create Store Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
