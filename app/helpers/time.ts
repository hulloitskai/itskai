import { DateTime } from "luxon";

export const isTodayIsh = (parsedDate: DateTime): boolean => {
  const now = DateTime.now();
  if (parsedDate.hasSame(now, "day")) {
    return true;
  }
  if (now.hour < 5) {
    return parsedDate.hasSame(now.minus({ day: 1 }), "day");
  }
  return false;
};
