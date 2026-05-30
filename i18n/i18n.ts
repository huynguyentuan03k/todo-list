import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../src/locales/en/menu.json';
import vi from '../src/locales/vi/menu.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: 'en',
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
});

export default i18n;
