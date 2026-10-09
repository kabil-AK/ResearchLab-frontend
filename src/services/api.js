import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Send JWT only for admin API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token && config.url.startsWith("/admin/")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
