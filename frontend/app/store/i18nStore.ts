"use client";

import { create } from "zustand";

interface I18nState {
  locale: string;
  setLocale: (lang: string) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  locale: "pl",
  setLocale: (lang) => {
    localStorage.setItem("lang", lang);
    set({ locale: lang });
  },
}));
