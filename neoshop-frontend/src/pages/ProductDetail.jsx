import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import "../styles/productDetail.css"; // CSS import add kiya

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]); // id dependency add ki hai best practice ke liye

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <div className="loader-container"><h2>Loading...</h2></div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        
        {/* Left Side: Image Section */}
        <div className="detail-image-section">
          <img src={product.image} alt={product.name} className="main-detail-img" />
        </div>

        {/* Right Side: Info Section */}
        <div className="detail-info-section">
          <nav className="breadcrumb">Home / Products / {product.category || 'Detail'}</nav>
          
          <h1 className="detail-title">{product.name}</h1>
          
          <div className="detail-price-tag">
            <span className="currency">₹</span>
            <span className="amount">{product.price.toLocaleString()}</span>
          </div>

          <div className="detail-description">
            <h3>Product Overview</h3>
            <p>{product.description}</p>
          </div>

          <div className="action-area">
            <button className="buy-now-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <p className="shipping-info">🚚 Free delivery on orders over ₹499</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;