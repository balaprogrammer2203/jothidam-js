import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request interceptor to automatically attach JWT token and active locale header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jothidam_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Active Language locale header
    const currentLang = localStorage.getItem('jothidam_locale') || 'ta';
    config.headers['Accept-Language'] = currentLang;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error messaging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(customMessage));
  }
);

export default apiClient;
