import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api.config';

export const accountService = {
  /**
   * Get all saved horoscopes belonging to current authenticated user
   */
  async getMyHoroscopes() {
    const res = await apiClient.get(API_ENDPOINTS.MY_HOROSCOPES);
    return res.data?.data || [];
  },

  /**
   * Delete a saved horoscope by ID
   */
  async deleteHoroscope(id) {
    const res = await apiClient.delete(API_ENDPOINTS.DELETE_HOROSCOPE(id));
    return res.data;
  },

  /**
   * Save a Prasannam chart (Jamakkol, Kadikara, KP Horary)
   */
  async savePrasannam(payload) {
    const res = await apiClient.post(API_ENDPOINTS.SAVE_PRASANNAM, payload);
    return res.data;
  },

  /**
   * Get all saved Prasannams belonging to current user
   */
  async getMyPrasannams(type = '') {
    const url = type ? `${API_ENDPOINTS.MY_PRASANNAMS}?type=${encodeURIComponent(type)}` : API_ENDPOINTS.MY_PRASANNAMS;
    const res = await apiClient.get(url);
    return res.data?.data || [];
  },

  /**
   * Get single Prasannam chart by ID
   */
  async getPrasannamById(id) {
    const res = await apiClient.get(API_ENDPOINTS.GET_PRASANNAM_BY_ID(id));
    return res.data?.data;
  },

  /**
   * Delete a saved Prasannam chart by ID
   */
  async deletePrasannam(id) {
    const res = await apiClient.delete(API_ENDPOINTS.DELETE_PRASANNAM(id));
    return res.data;
  },

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    const res = await apiClient.put(API_ENDPOINTS.AUTH_UPDATE_PROFILE, profileData);
    return res.data;
  }
};

export default accountService;
