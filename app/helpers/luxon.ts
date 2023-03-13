import { DateTime } from "luxon";

export const useParseDateTime = (text: string): DateTime =>
  useMemo(() => DateTime.fromISO(text), [text]);

export const useMaybeParseDateTime = (text?: string | null): DateTime | null =>
  useMemo(() => (text ? DateTime.fromISO(text) : null), [text]);
