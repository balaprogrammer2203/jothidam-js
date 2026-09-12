export const SUPPORTED_LANGUAGES = [
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Taml',
    direction: 'ltr',
    badge: 'தமிழ்',
    flag: '🇮🇳'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latn',
    direction: 'ltr',
    badge: 'EN',
    flag: '🌐'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Deva',
    direction: 'ltr',
    badge: 'हिन्दी',
    flag: '🇮🇳'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telu',
    direction: 'ltr',
    badge: 'తెలుగు',
    flag: '🇮🇳'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Knda',
    direction: 'ltr',
    badge: 'ಕನ್ನಡ',
    flag: '🇮🇳'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Mlym',
    direction: 'ltr',
    badge: 'മലയാളം',
    flag: '🇮🇳'
  }
];

export const DEFAULT_LANGUAGE = 'ta';

export const NAMESPACES = ['common', 'horoscope', 'saved', 'admin', 'auth', 'astrology'];

export const getLanguageConfig = (code) => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code) || SUPPORTED_LANGUAGES[0];
};
