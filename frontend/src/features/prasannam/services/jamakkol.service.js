/**
 * Enterprise Jamakkol Prasannam Service
 * Connects to backend API `/api/v1/astrology/jamakkol-prasannam/calculate` with local computation fallback.
 */

import apiClient from '../../../core/api/apiClient';
import { computeLocalJamakkol } from '../../../utils/jamakkol.utils';

export const jamakkolService = {
  /**
   * Calculates Jamakkol Prasannam via backend or fallback to client calculation
   */
  async calculate(params = {}) {
    try {
      const response = await apiClient.post('/astrology/jamakkol-prasannam/calculate', params);
      if (response?.data?.success && response?.data?.data) {
        return response.data.data;
      }
    } catch {
      // Graceful local calculation fallback
    }
    return computeLocalJamakkol(params);
  },

  /**
   * Fetches master rules, 70+ questions, and FAQs for Jamakkol
   */
  async fetchMasterData(params = {}) {
    try {
      const response = await apiClient.get('/astrology/master/jamakkol-prasannam', { params });
      if (response?.data?.success && response?.data?.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return null;
  }
};

export default jamakkolService;
