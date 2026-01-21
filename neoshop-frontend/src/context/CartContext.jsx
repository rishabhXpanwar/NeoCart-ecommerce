

import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCartApi, removeFromCartApi, updateCartApi } from "../api/cart";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  // 🔹 Jab user login/logout ho → backend se cart load / clear
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  // 🔹 Backend se cart laana
  const loadCart = async () => {
    try {
      const data = await getCart();
      const rawItems = data.data.items;

const formatted = rawItems.map(i => ({
  ...i.product,
  qty: i.quantity
}));

setCart(formatted);
setTotal(data.data.totalPrice);

      
      //console.log("BACKEND CART RESPONSE:", data.data.items);
    } catch (err) {
      console.log("Load cart error:", err);
    }
  };

  // 🔹 Add to cart (Optimistic UI)
  const addToCart = async (product) => {
    try {
      // 1. Frontend cart turant update
      setCart((prev) => {
        const existing = prev.find((item) => item._id === product._id);

        if (existing) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          return [...prev, { ...product, qty: 1 }];
        }
      });

      // 2. Backend cart update
      await addToCartApi(product._id);
      loadCart();// ye isliye ke ab hum cart ka total backend se le rhe hai 
      // or add to cart se value tho update ho jayge pr load cart se dubara se data backend se aayga
      // jisme updated total hoga 
      // direct bhi shi chl rha tha bina iske par us case me frontend vala total dikha rha tha 
      // //mai or usme dikkat tb hogi jb discount vagera or baki cheeze aaynge
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // 🔹 Remove from cart
  const removeFromCart = async (id) => {
    try {
      // frontend update
      setCart((prev) => prev.filter((item) => item._id !== id));

      // backend update
      await removeFromCartApi(id);
      loadCart();
    } catch (err) {
      console.log("Remove cart error:", err);
    }
  };

  const updateQty = async (id, newQty) => {
  try {
    if (newQty <= 0) {
      await removeFromCart(id);
      return;
    }

    // frontend update
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: newQty } : item
      )
    );

    // backend update
    await updateCartApi(id, newQty);
    loadCart();
  } catch (err) {
    console.log("Update qty error:", err);
  }
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart , updateQty , total}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
