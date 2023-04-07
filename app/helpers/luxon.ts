import { DateTime, Settings } from "luxon";

declare module "luxon" {
  interface TSSettings {
    throwOnInvalid: true;
  }
}

export const setupLuxon = () => {
  Settings.defaultLocale = "en-US";
  Settings.throwOnInvalid = true;
};

export const useParseDateTime = (text: string): DateTime =>
  useMemo(() => DateTime.fromISO(text), [text]);

// export const useMaybeParseDateTime = (text?: string | null): DateTime | null =>
//   useMemo(() => (text ? DateTime.fromISO(text) : null), [text]);
