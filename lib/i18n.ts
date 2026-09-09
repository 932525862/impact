import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🔥 JSON fayllarni import qilamiz
import uzTranslation from "../locales/uz/translation.json";
import ruTranslation from "../locales/ru/translation.json";
import enTranslation from "../locales/en/translation.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        uz: { translation: uzTranslation },
        ru: { translation: ruTranslation },
        en: { translation: enTranslation },
      },
      lng: "uz",
      fallbackLng: "uz",
      interpolation: { escapeValue: false },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
