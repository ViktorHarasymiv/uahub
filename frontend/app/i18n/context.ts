import { createContext } from "react";

export const I18nContext = createContext<{
  locale: string;
  messages: Record<string, string>;
} | null>(null);
