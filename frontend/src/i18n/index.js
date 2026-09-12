import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, NAMESPACES } from './languages';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    ns: NAMESPACES,
    defaultNS: 'common',
    fallbackNS: 'common',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'jothidam_locale',
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false // React already escapes XSS
    },

    react: {
      useSuspense: true
    }
  });

// Keep document language and title aligned with current locale
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lng);
  if (langConfig) {
    document.documentElement.dir = langConfig.direction || 'ltr';
  }
});

export default i18n;
