import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://184.73.135.201:8000',
    timeout: 1000,
  });
  
export default axiosInstance;