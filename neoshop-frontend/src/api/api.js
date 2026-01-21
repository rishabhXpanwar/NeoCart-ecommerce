import axios from "axios";

/*
  Yahan backend ka base URL set hoga.
  Abhi local backend ke liye:
*/

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
