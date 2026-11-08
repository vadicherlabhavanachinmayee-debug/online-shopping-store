import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../components/products.json"; 
import { ShoppingBag, ShoppingCart, Zap, Search, Heart, LogOut } from "lucide-react";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // CHANGED: Store actual items in cart instead of just a count
  const [cartItems, setCartItems] = useState([]);

  const categories = ["All", "Laptops", "Smartphones", "Audio", "Wearables", "Fashion", "Home"];
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, products]);

  // Function to handle Add to Cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`);
  };

  // Function for Buy Now (Single Item)
  const handleBuyNow = (product) => {
    navigate("/payment", { state: { product, items: [product] } });
  };

  // NEW: Function for Cart Button (All Items)
  const handleCartClick = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Pass the first item for the preview and the whole list for the total
    navigate("/payment", { state: { product: cartItems[0], items: cartItems } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) return (
    <div className="loader-screen">
      <div className="spinner"></div>
      <p>URBAN SHOP</p>
    </div>
  );

  return (
    <div className="home-wrapper">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <nav className="shop-nav">
        <div className="nav-brand">
          <ShoppingBag className="brand-icon" />
          <span>URBAN SHOP</span>
        </div>

        <div className="nav-search">
          <div className="search-box">
            <Search size={18} />
            <input 
              placeholder="Search premium products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="nav-actions">
          {/* UPDATED: Cart button now triggers handleCartClick */}
          <div className="cart-btn" onClick={handleCartClick} style={{cursor: 'pointer'}}>
            <ShoppingCart className="action-icon" />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </div>
          <button className="logout-pill" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="home-container">
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <header className="page-header">
          <h1>{activeCategory} Collection</h1>
          <p>Showing {filteredProducts.length} items</p>
        </header>

        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div key={product._id || index} className="product-card">
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
                <button className="wish-btn"><Heart size={18} /></button>
              </div>

              <div className="product-info">
                <span className="cat-tag">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="desc-text">{product.description}</p>
                
                <div className="card-footer">
                  <div className="price-tag">₹{product.price.toLocaleString()}</div>
                  <div className="button-row">
                    {/* UPDATED: Add to cart now passes the product object */}
                    <button className="add-btn" onClick={() => addToCart(product)}>
                      + Cart
                    </button>
                    <button className="buy-btn" onClick={() => handleBuyNow(product)}>
                      <Zap size={14} fill="currentColor"/> 
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;