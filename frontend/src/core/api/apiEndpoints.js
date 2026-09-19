/**
 * Centralized API Endpoints Registry
 * Eliminates magic strings and facilitates versioning, mocks, and environment overrides.
 */

export const API_ENDPOINTS = {
  // Horoscope & Ephemeris
  HOROSCOPE: {
    GENERATE: '/api/generate-kundali',
    PLANETARY_POSITIONS: '/api/planetary-positions',
    PANCHANGAM: '/api/panchangam',
    PRASANNAM_CLOCK: '/api/prasannam/kadikara'
  },

  // User Saved Horoscopes
  SAVED_HOROSCOPES: {
    BASE: '/api/saved-horoscopes',
    DETAIL: (id) => `/api/saved-horoscopes/${id}`
  },

  // Authentication & Security
  AUTH: {
    LOGIN: '/api/admin/auth/login',
    VERIFY: '/api/admin/auth/verify',
    LOGOUT: '/api/admin/auth/logout',
    REFRESH: '/api/admin/auth/refresh'
  },

  // Master Data & Ephemeris Directories
  MASTER_DATA: {
    RASIS: '/api/master/rasis',
    NAKSHATRAS: '/api/master/nakshatras',
    NAKSHATRA_PADAS: '/api/master/nakshatra-padas',
    PLANETS: '/api/master/planets',
    KP_HORARY: '/api/master/kp-horary',
    TITHIS: '/api/master/tithis',
    YOGAS: '/api/master/yogas',
    KARANAS: '/api/master/karanas',
    KALACHAKRAM: '/api/master/kalachakram',
    TAMIL_CALENDAR: '/api/master/tamil-calendar'
  },

  // Admin Master Tables Management
  ADMIN: {
    COLLECTION: (table) => `/api/admin/tables/${table}`,
    RECORD: (table, id) => `/api/admin/tables/${table}/${id}`
  }
};

export default API_ENDPOINTS;
