import axios from "axios";

const axiosInstance = axios.create({
  baseURL: [
    "http://localhost:4500",
    "https://craveit-backend-pdlt.onrender.com",
  ],
  withCredentials: true,
});

export default axiosInstance;
