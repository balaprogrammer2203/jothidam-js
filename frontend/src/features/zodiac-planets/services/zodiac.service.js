/**
 * Enterprise Zodiac & Planetary Ephemeris Service
 * Manages queries and calculations for 12 Rasis, 27 Nakshatras, 108 Padas, 9 Navagrahas, and 360° Kalachakram.
 */

import masterDataService from '../../../services/masterData.service';

export const zodiacService = {
  async getRasis() {
    return await masterDataService.getRasis();
  },

  async getNakshatras() {
    return await masterDataService.getNakshatras();
  },

  async getNakshatraPadas() {
    return await masterDataService.getNakshatraPadas();
  },

  async getPlanets() {
    return await masterDataService.getPlanets();
  },

  async getKalachakram() {
    return await masterDataService.getKalachakram();
  }
};

export default zodiacService;
