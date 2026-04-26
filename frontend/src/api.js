import axios from "axios";

const API = axios.create({
  baseURL: "https://fitfusion-backend-f8j6.onrender.com/api"
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;