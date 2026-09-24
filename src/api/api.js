import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: backendBaseUrl,
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
