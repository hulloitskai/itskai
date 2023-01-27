import { DateTime } from "luxon";

export const useDateTime = (text: string): DateTime => {
  return useMemo(() => DateTime.fromISO(text), [text]);
};

export const useOptionalDateTime = (text?: string | null): DateTime | null => {
  return useMemo(() => (text ? DateTime.fromISO(text) : null), [text]);
};
