import api from "./api";

// Register
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};
