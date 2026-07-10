import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import tr from "./locales/tr.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import ar from "./locales/ar.json";

i18n
  .use(initReactI18next) // LanguageDetector'ü buradan sildik
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      fr: { translation: fr },
      it: { translation: it },
      ar: { translation: ar },
    },
    lng: "tr", // Uygulama her zaman bu dilde başlar
    fallbackLng: "tr", // Dil belirlenemezse her zaman buna döner
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
