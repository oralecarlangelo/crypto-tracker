import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 2000,
});

export default axiosInstance;
