import api from "./api";

// place order
export const placeOrderApi = async (orderData) => {
  const { data } = await api.post("/orders/create", orderData);
  return data;
};

// get my orders
export const getMyOrdersApi = async () => {
  const { data } = await api.get("/orders");
  return data;
};

// get order by id
export const getOrderByIdApi = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};
