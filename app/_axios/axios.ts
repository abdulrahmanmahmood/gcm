// _axios/axios.ts
import axios from "axios";

export const baseUrl = "/api/v1";

const axiosInstant = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, // Dynamically use the environment variable
  headers: {
    "Content-Type": "application/json",
    // Removed Host and Content-Length, as they are automatically handled by Axios
  },
});

export default axiosInstant;
