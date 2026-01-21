import "./../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container"> {/* [UPDATE]: Alignment ke liye container add kiya */}
        <div className="logo">
          <Link to="/">Neo<span>Shop</span></Link> {/* [UPDATE]: Span add kiya dual-tone logo ke liye */}
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          <li className="cart-link">
            <Link to="/cart">
              Cart 
              {/* [UPDATE]: Badge logic thoda saaf kiya */}
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
          </li>

          {user ? (
            <>
              <li><Link to="/orders">Orders</Link></li>
              {/* [UPDATE]: Logout ko button style dene ke liye class add ki */}
              <li className="logout-btn" onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li className="register-btn">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}