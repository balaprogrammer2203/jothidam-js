/**
 * Enterprise Axios HTTP Client
 * Configured with request/response interceptors, automatic JWT authentication,
 * active locale negotiation, error normalization, and 401 session expiry handling.
 */

import axios from 'axios';
import { API_BASE_URL } from '../../config/api.config';
import { safeLocalStorage } from '../security/storage';
import { HttpError, NetworkError, AuthError } from '../errors/AppError';
import errorLogger from '../errors/errorLogger';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 20000 // 20s timeout for complex ephemeris calculations
});

// Request Interceptor: Attach JWT token & Accept-Language header
apiClient.interceptors.request.use(
  (config) => {
    const token = safeLocalStorage.getItem('jothidam_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Active language locale header
    const currentLang = safeLocalStorage.getItem('jothidam_locale') || 'ta';
    config.headers['Accept-Language'] = currentLang;

    return config;
  },
  (error) => Promise.reject(new NetworkError(error.message))
);

// Response Interceptor: Standardize responses & normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Network / Offline Error
    if (!error.response) {
      const netErr = new NetworkError(error.message || 'Unable to connect to server. Please verify your internet connection.');
      errorLogger.error(netErr, null, { url: error.config?.url });
      return Promise.reject(netErr);
    }

    const { status, data } = error.response;
    const message = data?.error || data?.message || error.message || 'An unexpected error occurred';
    const code = data?.code || `HTTP_${status}`;

    // 2. 401 Unauthorized / Token Expired
    if (status === 401) {
      safeLocalStorage.removeItem('jothidam_auth_token');
      safeLocalStorage.removeItem('jothidam_auth_user');

      // Dispatch custom event so AuthContext or app can react gracefully
      window.dispatchEvent(new CustomEvent('jothidam:auth-expired', { detail: { message } }));

      const authErr = new AuthError(message, status, code);
      return Promise.reject(authErr);
    }

    // 3. Other HTTP Errors (400, 403, 404, 422, 500)
    const httpErr = new HttpError(message, status, code, data?.details || null);
    errorLogger.error(httpErr, null, { url: error.config?.url, status });
    return Promise.reject(httpErr);
  }
);

export default apiClient;
