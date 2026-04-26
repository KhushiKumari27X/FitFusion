import axios from "axios";

// ✅ DEBUG (important)
console.log("API WORKING TEST");

const API = axios.create({
  baseURL: "https://fitfusion-backend-f8j6.onrender.com/api",
  withCredentials: true,
});

// Attach token
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// Handle errors
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Token issue");
    }
    return Promise.reject(error);
  }
);

export default API;