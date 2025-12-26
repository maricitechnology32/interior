import axios from 'axios';

// Create a new 'instance' of axios
const api = axios.create({
  // We set the base URL for all API requests
  // Uses VITE_API_URL if set (production), otherwise defaults to localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

/*
  This is a 'request interceptor'. It's a function that
  will run *before* every single API request is sent.

  Here, we're telling it to:
  1. Get the 'userInfo' (which has our token) from localStorage.
  2. If the user is logged in, automatically add the
     'Authorization: Bearer <token>' header to the request.

  This means we don't have to manually add the token
  to every protected request (like creating a blog post).
*/
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    if (userInfo && userInfo.token) {
      config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;