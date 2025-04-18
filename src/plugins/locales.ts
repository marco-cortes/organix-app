import { createI18n } from 'vue-i18n';

import en from '../locales/en.json';
import es from '../locales/es.json';

const defaultLocale: 'es' | 'en' = 'en';

export default createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages: { en, es }
})