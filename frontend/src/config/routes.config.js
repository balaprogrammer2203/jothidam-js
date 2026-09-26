/**
 * Centralized Application Routes Registry & SEO URL Mapping
 * Single source of truth for all navigation, breadcrumbs, canonical SEO URLs, and redirects.
 */

export const ROUTES = {
  // 1. Birth Chart Calculator (Home)
  HOME: '/',
  HOROSCOPE: {
    CALCULATOR: '/',
    SAVED: '/saved-horoscopes',
    SAVED_DETAIL: '/saved-horoscopes/:id',
    savedDetailPath: (id) => `/saved-horoscopes/${id}`
  },

  // 2. Horary Prasannam Astrology
  PRASANNAM: {
    KADIKARA: '/prasannam/kadikara-clock',
    JAMAKKOL: '/prasannam/jamakol'
  },

  // 3. Zodiac Signs & Planetary Ephemeris
  ZODIAC: {
    RASIS: '/zodiac/rasis',
    NAKSHATRAS: '/zodiac/nakshatras',
    NAKSHATRA_PADAS: '/zodiac/nakshatra-padas',
    PLANETS: '/zodiac/navagraha-planets',
    PLANET_DIGNITIES: '/zodiac/planet-dignities',
    KALACHAKRAM: '/zodiac/kalachakram-360'
  },

  // 4. Krishnamurti Paddhati (KP) Astrology
  KP_ASTROLOGY: {
    HORARY: '/kp-astrology/horary-1-249'
  },

  // 5. Vedic Panchangam Almanac
  PANCHANGAM: {
    TITHIS: '/panchangam/tithis',
    YOGAS: '/panchangam/yogas',
    KARANAS: '/panchangam/karanas',
    TAMIL_CALENDAR: '/panchangam/tamil-calendar'
  },

  // 6. Administration & Authentication
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin',
    TABLE: '/admin/:table',
    tablePath: (table) => `/admin/${table}`
  }
};

/**
 * Backward compatibility redirect mapping:
 * Maps previous flat URLs to the new SEO-rich hierarchical routes.
 */
export const LEGACY_ROUTE_REDIRECTS = [
  { from: '/saved', to: ROUTES.HOROSCOPE.SAVED },
  { from: '/kadikara-prasannam', to: ROUTES.PRASANNAM.KADIKARA },
  { from: '/jamakol', to: ROUTES.PRASANNAM.JAMAKKOL },
  { from: '/jamakkol', to: ROUTES.PRASANNAM.JAMAKKOL },
  { from: '/jamakol-prasannam', to: ROUTES.PRASANNAM.JAMAKKOL },
  { from: '/jamakkol-prasannam', to: ROUTES.PRASANNAM.JAMAKKOL },
  { from: '/rasis', to: ROUTES.ZODIAC.RASIS },
  { from: '/nakshatras', to: ROUTES.ZODIAC.NAKSHATRAS },
  { from: '/nakshatra-padas', to: ROUTES.ZODIAC.NAKSHATRA_PADAS },
  { from: '/planets', to: ROUTES.ZODIAC.PLANETS },
  { from: '/planet-dignities', to: ROUTES.ZODIAC.PLANET_DIGNITIES },
  { from: '/dignities', to: ROUTES.ZODIAC.PLANET_DIGNITIES },
  { from: '/kalachakram', to: ROUTES.ZODIAC.KALACHAKRAM },
  { from: '/kp-horary', to: ROUTES.KP_ASTROLOGY.HORARY },
  { from: '/tithis', to: ROUTES.PANCHANGAM.TITHIS },
  { from: '/yogas', to: ROUTES.PANCHANGAM.YOGAS },
  { from: '/karanas', to: ROUTES.PANCHANGAM.KARANAS },
  { from: '/tamil-calendar', to: ROUTES.PANCHANGAM.TAMIL_CALENDAR }
];

export default ROUTES;
