import { DateTime } from "luxon";

export const useDateTime = (text: string): DateTime => {
  return useMemo(() => DateTime.fromISO(text), [text]);
};
