"use client";

import { create } from "zustand";

export type Locale = "pl" | "ua" | "en";

interface I18nState {
  locale: Locale;
  setLocale: (lang: Locale) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  locale: "pl",
  setLocale: (lang) => {
    localStorage.setItem("lang", lang);
    set({ locale: lang });
  },
}));
