import api from "./api";

export const createStripeSession = async (orderId) => {
  const { data } = await api.post("/payment/create-checkout-session", { orderId });
  return data;
};
