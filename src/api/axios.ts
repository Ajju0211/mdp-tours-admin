import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ||'http://localhost:3000/api/v1', // your backend
  withCredentials: true, // important for HttpOnly cookies
});

// Optional: Add interceptors for logging or handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);