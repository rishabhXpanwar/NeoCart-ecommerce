import axios from "axios";

/*
  Yahan backend ka base URL set hoga.
  Abhi local backend ke liye:
*/

const api = axios.create({
  baseURL: "https://neo-cart-ecommerce.vercel.app/api",
});

/*
  Har request ke saath token automatically bhejne ke liye
*/

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
