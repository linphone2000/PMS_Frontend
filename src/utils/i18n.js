import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          Language: "Language",
        },
      },
      es: {
        translation: {
          Language: "Idioma",
        },
      },
      fr: {
        translation: {
          Language: "Langue",
        },
      },
      de: {
        translation: {
          Language: "Sprache",
        },
      },
      zh: {
        translation: {
          Language: "语言",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
