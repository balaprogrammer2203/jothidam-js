import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api.config';

export const authService = {
  /**
   * Login with username and password
   */
  async login(username, password) {
    const res = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, { username, password });
    return res.data;
  },

  /**
   * Get current authenticated user details
   */
  async getMe() {
    const res = await apiClient.get(API_ENDPOINTS.AUTH_ME);
    return res.data?.user;
  },

  /**
   * Register a new user
   */
  async register(userData) {
    const res = await apiClient.post(API_ENDPOINTS.AUTH_REGISTER, userData);
    return res.data;
  },

  /**
   * Reset / Forgot password
   */
  async resetPassword(resetData) {
    const res = await apiClient.post(API_ENDPOINTS.AUTH_RESET_PASSWORD, resetData);
    return res.data;
  },

  /**
   * Seed default accounts
   */
  async seedUsers() {
    const res = await apiClient.post(API_ENDPOINTS.AUTH_SEED);
    return res.data;
  }
};

export default authService;
