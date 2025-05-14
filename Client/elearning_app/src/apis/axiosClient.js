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
     return Promise.reject(error);
    }
  );