export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  GENERATE_CHART: '/astrology/generate-chart',
  SAVE_HOROSCOPE: '/astrology/save-horoscope',
  GET_HOROSCOPES: '/astrology/horoscopes',
  GET_HOROSCOPE_BY_ID: (id) => `/astrology/horoscopes/${id}`,
  SEARCH_PLACES: '/astrology/places',
  MASTER_AYANAMSAS: '/astrology/master/ayanamsas',

  // Master Reference Tables
  MASTER_RASIS: '/astrology/master/rasis',
  MASTER_NAKSHATRAS: '/astrology/master/nakshatras',
  MASTER_NAKSHATRA_PADAS: '/astrology/master/nakshatra-padas',
  MASTER_NAKSHATRA_PADA_BY_NUM: (num) => `/astrology/master/nakshatra-padas/${num}`,
  MASTER_PLANETS: '/astrology/master/planets',
  MASTER_KP_HORARY: '/astrology/master/kp-horary',
  MASTER_KP_HORARY_BY_NUM: (num) => `/astrology/master/kp-horary/${num}`,
  MASTER_TITHIS: '/astrology/master/tithis',
  MASTER_YOGAS: '/astrology/master/yogas',
  MASTER_KARANAS: '/astrology/master/karanas',
  MASTER_KALACHAKRAM: '/astrology/master/kalachakram',
  MASTER_TAMIL_YEARS: '/astrology/master/tamil-years',
  MASTER_TAMIL_MONTHS: '/astrology/master/tamil-months',
  MASTER_KADIKARA_PRASANNAM: '/astrology/master/kadikara-prasannam',
  MASTER_KADIKARA_BHAVA_BY_NUM: (bhava) => `/astrology/master/kadikara-prasannam/bhavas/${bhava}`,
  
  // Admin Endpoints
  ADMIN_STATS: '/admin/stats',
  ADMIN_TABLE: (table) => `/admin/${table}`,
  ADMIN_RECORD: (table, id) => `/admin/${table}/${id}`,
  ADMIN_PERMISSIONS: '/admin/permissions',
  ADMIN_ROLE_PERMISSIONS: (role) => `/admin/permissions/${role}`,
  ADMIN_RESET_PERMISSIONS: '/admin/permissions/reset',

  // Auth Endpoints
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_RESET_PASSWORD: '/auth/reset-password',
  AUTH_ME: '/auth/me',
  AUTH_SEED: '/auth/seed'
};
