// _axios/axios.ts
import axios from "axios";

export const baseUrl = "/api/v1";

const axiosInstant = axios.create({
  baseURL: "http://localhost:8090", // or use process.env for dynamic URLs
  headers: {
    "Content-Type": "application/json",
    // Removed Host and Content-Length, as they are automatically handled by Axios
  },
});

export default axiosInstant;
