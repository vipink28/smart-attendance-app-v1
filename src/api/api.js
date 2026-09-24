import axios from "axios";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://attendly-backend-zeqz.onrender.com/api";
export const api = axios.create({
  baseURL: backendUrl,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("saatoken");

  // Guard against null, empty string, or literal "undefined" string
  if (token && token !== "undefined") {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
