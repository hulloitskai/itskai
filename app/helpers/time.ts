import { DateTime } from "luxon";

export const isTodayIsh = (dateTime: DateTime): boolean => {
  const now = DateTime.now();
  if (dateTime.hasSame(now, "day")) {
    return true;
  }
  if (now.hour < 5) {
    return dateTime.hasSame(now.minus({ day: 1 }), "day");
  }
  return false;
};
