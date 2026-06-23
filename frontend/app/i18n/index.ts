import ua from "./locales/ua.json";
import en from "./locales/en.json";
import pl from "./locales/pl.json";

export const locales = ["ua", "en", "pl"] as const;
export type Locale = (typeof locales)[number];

const messagesMap: Record<Locale, Record<string, string>> = {
  ua,
  en,
  pl,
};

export async function getMessages(locale: Locale) {
  return messagesMap[locale];
}
