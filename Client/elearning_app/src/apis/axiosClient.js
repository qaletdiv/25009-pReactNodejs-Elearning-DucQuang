import axios from 'axios';
 
console.log("baseURL", import.meta.env.VITE_API_URL_KEY);
export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL_KEY,
    headers: {
        "Content-Type": "application/json",
    }
   
})
axiosClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      if (response && response.status === 401) {
        localStorage.removeItem("accessToken");
      }
     return Promise.reject(error);
    }
  );