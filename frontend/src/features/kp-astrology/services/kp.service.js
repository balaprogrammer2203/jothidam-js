/**
 * Enterprise KP Astrology Service
 * Manages Krishnamurti Paddhati (KP) Horary numbers 1-249 and sub-lord algorithms.
 */

import masterDataService from '../../../services/masterData.service';

export const kpService = {
  /**
   * Fetches authentic KP 1-249 reference table
   */
  async getKPHoraryNumbers(params = {}) {
    return await masterDataService.getKPHorary(params);
  },

  /**
   * Filters KP numbers by Sign Lord, Star Lord, or Sub Lord
   */
  filterKPHorary(items, { signLord, starLord, subLord, search }) {
    if (!items || !Array.isArray(items)) return [];
    return items.filter((row) => {
      if (signLord && row.signLord?.toLowerCase() !== signLord.toLowerCase()) return false;
      if (starLord && row.starLord?.toLowerCase() !== starLord.toLowerCase()) return false;
      if (subLord && row.subLord?.toLowerCase() !== subLord.toLowerCase()) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchesNum = String(row.number || row.kpNumber).includes(q);
        const matchesSign = (row.sign || row.rasi || '').toLowerCase().includes(q);
        const matchesStar = (row.star || row.nakshatra || '').toLowerCase().includes(q);
        if (!matchesNum && !matchesSign && !matchesStar) return false;
      }
      return true;
    });
  }
};

export default kpService;
