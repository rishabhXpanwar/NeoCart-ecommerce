import "../styles/home.css";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import api from "../api/api";

function Home() {
  const [allproducts, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="home-title">Latest Products</h2>
        <p className="home-subtitle">Explore our newest arrivals and trending styles</p>
      </header>

      <div className="product-grid">
        {allproducts.length > 0 ? (
          allproducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))
        ) : (
          <div className="loading-state">Loading amazing products...</div>
        )}
      </div>
    </div>
  );
}

export default Home;