// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true
// });

// export default API/;
import axios from "axios";

const API = axios.create({
  baseURL: "https://fitfusion-backend-f8j6.onrender.com/api",
  withCredentials: true
});

export default API;