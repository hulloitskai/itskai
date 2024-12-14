import { Text } from "@mantine/core";
import { type DateTimeFormatOptions } from "luxon";
import { DateTime } from "luxon";
import { type ElementType } from "react";

import classes from "./Time.module.css";

export interface TimeProps
  extends Omit<TextProps, "span">,
    Omit<ComponentPropsWithoutRef<"time">, "color" | "style" | "children"> {
  format: DateTimeFormatOptions | ((time: DateTime) => string) | string;
  children: DateTime | string;
  component?: ElementType;
  refreshInterval?: number;
}

const Time: FC<TimeProps> = ({
  children,
  component = "span",
  refreshInterval,
  format,
  lh,
  m,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  ...otherProps
}) => {
  const applyFormat = useCallback(
    (time: DateTime) => {
      switch (typeof format) {
        case "function":
          return format(time);
        case "string":
          return time.toFormat(format);
        default:
          return time.toLocaleString(format);
      }
    },
    [format],
  );
  const placeholder = useMemo(
    () => applyFormat(DateTime.fromSeconds(0, { zone: "utc" })),
    [applyFormat],
  );

  // == Formatting
  const [formattedTime, setFormattedTime] = useState<string | undefined>();
  useEffect(() => {
    const time =
      typeof children === "string" ? DateTime.fromISO(children) : children;
    setFormattedTime(applyFormat(time));
    if (refreshInterval) {
      const interval = setInterval(() => {
        setFormattedTime(applyFormat(time));
      }, refreshInterval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [children, applyFormat, refreshInterval]);

  // == Loading
  const loading = !formattedTime;

  return (
    <Skeleton
      className={classes.skeleton}
      {...{ component }}
      visible={!formattedTime}
      {...{ m, mt, mr, mb, ml, mx, my }}
    >
      <Text
        component="time"
        span
        display="inline-grid"
        lh={loading ? 1 : lh}
        {...otherProps}
      >
        {formattedTime ?? placeholder}
      </Text>
    </Skeleton>
  );
};

export default Time;
