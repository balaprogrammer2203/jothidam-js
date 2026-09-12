import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api.config';

export const horoscopeService = {
  /**
   * Generates South/North Indian horoscope chart
   */
  async generateChart(payload) {
    const res = await apiClient.post(API_ENDPOINTS.GENERATE_CHART, payload);
    return res.data?.chartData;
  },

  /**
   * Saves horoscope profile to database
   */
  async saveHoroscope(payload) {
    const res = await apiClient.post(API_ENDPOINTS.SAVE_HOROSCOPE, payload);
    return res.data;
  },

  /**
   * Autocomplete search for places worldwide
   */
  async searchPlaces(query) {
    if (!query || query.trim().length < 2) return [];
    const res = await apiClient.get(API_ENDPOINTS.SEARCH_PLACES, {
      params: { query: query.trim() }
    });
    return res.data || [];
  },

  /**
   * Fetches supported master Ayanamsas
   */
  async getMasterAyanamsas() {
    const res = await apiClient.get(API_ENDPOINTS.MASTER_AYANAMSAS);
    return res.data;
  }
};

export default horoscopeService;
