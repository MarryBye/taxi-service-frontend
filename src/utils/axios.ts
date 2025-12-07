// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOSwicm9sZSI6ImNsaWVudCIsImV4cCI6MTc2NTEyNTcxN30.2g6L2Bxu4T-OiX-ZuUixQzEvQrpNGPbExp71oLEurPs";
  if (token) config.headers.Token = `${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error", err);
    return Promise.reject(err);
  }
);

export default api;