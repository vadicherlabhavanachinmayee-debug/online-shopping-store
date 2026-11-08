import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>🛒 Online Shop</h2>
      </div>

      <div className="nav-right">
        <Link to="/home">Home</Link>

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}

        {token && <Link to="/payment">Payment</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
