import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Cancel from "./pages/Cancel";






import ProductDetail from "./pages/ProductDetail";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetail />
    </ProtectedRoute>
  }
/>

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>

<Route
  path="/cancel"
  element={
    <ProtectedRoute>
      <Cancel />
    </ProtectedRoute>
  }
/>




      </Routes>
    </>
  );
}

export default App;
