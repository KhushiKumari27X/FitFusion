import axios from "axios";

const API = axios.create({
  baseURL: "https://fitfusion-backend-f8j6.onrender.com/api",
  withCredentials: true,
});

//  Attach token automatically
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

//  Handle errors cleanly
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // optional: auto logout
      localStorage.removeItem("token");

      // silent (no console spam)
    }

    return Promise.reject(error);
  }
);

export default API;