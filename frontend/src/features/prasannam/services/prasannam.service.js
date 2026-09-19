/**
 * Enterprise Prasannam Service
 * Encapsulates API calls, local calculations, and fallbacks for Horary Prasannam divination.
 */

import apiClient from '../../../core/api/apiClient';
import { API_ENDPOINTS } from '../../../core/api/apiEndpoints';
import { calculateKadikaraPrasannam } from '../../../utils/kadikaraPrasannam';

export const prasannamService = {
  /**
   * Calculates Kadikara (Clock) Prasannam locally using classical rules
   */
  calculateClockPrasannam(hours, minutes, customOptions = {}) {
    return calculateKadikaraPrasannam(hours, minutes, customOptions);
  },

  /**
   * Fetches server-calculated ephemeris and planetary positions for the prasannam moment
   */
  async fetchMomentEphemeris(params) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.HOROSCOPE.PRASANNAM_CLOCK, params);
      return response.data;
    } catch {
      // Graceful fallback to client calculations
      return null;
    }
  }
};

export default prasannamService;
