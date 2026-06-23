"use client";

import { useEffect, useState } from "react";
import { I18nContext } from "./context";
import { getMessages } from "./index";
import { useI18nStore } from "../store/i18nStore";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useI18nStore((s) => s.locale);
  const setLocale = useI18nStore((s) => s.setLocale);

  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  // 1. Ініціалізація мови з localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lang") || "pl";
    setLocale(saved);
  }, [setLocale]);

  // 2. Реактивне завантаження messages при зміні locale
  useEffect(() => {
    if (!locale) return;
    getMessages(locale).then((m) => setMessages(m));
  }, [locale]);

  console.log(locale);

  if (!messages) return null;

  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}
