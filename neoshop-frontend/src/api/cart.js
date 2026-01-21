import api from "./api";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const addToCartApi = async (productId) => {
  const { data } = await api.post("/cart/add", { productId });
  return data;
};

export const removeFromCartApi = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
};


export const updateCartApi = async (productId, quantity) => {
  const { data } = await api.put("/cart/update", { productId, quantity });
  return data;
};
