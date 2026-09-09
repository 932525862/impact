"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && ["uz", "ru", "en"].includes(savedLang)) {
      if (i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
      }
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
