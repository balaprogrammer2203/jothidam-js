import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api.config';

export const savedProfilesService = {
  /**
   * Fetches all saved user horoscopes from MongoDB
   */
  async getSavedHoroscopes() {
    const res = await apiClient.get(API_ENDPOINTS.GET_HOROSCOPES);
    return res.data?.data || [];
  },

  /**
   * Fetches a single horoscope by its ID
   */
  async getSavedHoroscopeById(id) {
    const res = await apiClient.get(API_ENDPOINTS.GET_HOROSCOPE_BY_ID(id));
    return res.data?.data;
  }
};

export default savedProfilesService;
