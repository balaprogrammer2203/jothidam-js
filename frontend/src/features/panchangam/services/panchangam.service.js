/**
 * Enterprise Vedic Panchangam Service
 * Manages calculations and master datasets for Tithis, Yogas, Karanas, and 60-Year Tamil Calendar.
 */

import masterDataService from '../../../services/masterData.service';

export const panchangamService = {
  async getTithis() {
    return await masterDataService.getTithis();
  },

  async getYogas() {
    return await masterDataService.getYogas();
  },

  async getKaranas() {
    return await masterDataService.getKaranas();
  },

  async getTamilCalendar() {
    return await masterDataService.getTamilCalendar();
  }
};

export default panchangamService;
