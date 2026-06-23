"use client";

import { useContext } from "react";
import { I18nContext } from "./context";

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("I18nProvider is missing");
  return ctx;
}
