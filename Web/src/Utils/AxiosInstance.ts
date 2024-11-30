import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'API LINK',
    timeout: 1000,
  });
  
export default axiosInstance;