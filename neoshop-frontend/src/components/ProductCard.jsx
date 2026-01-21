import "../styles/productCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-img">
          <img src={product.image} alt={product.name} />
          {/* Badge optional hai, design ko premium dikhane ke liye */}
          <span className="badge">New</span>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="price">₹{product.price.toLocaleString()}</p>
        </div>
      </Link>

      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;