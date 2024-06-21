import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

import { DateTime } from "luxon";
import type { DateTimeFormatOptions } from "luxon";

import classes from "./Time.module.css";

export interface TimeProps
  extends Omit<TextProps, "span">,
    Omit<ComponentPropsWithoutRef<"time">, "color" | "style" | "children"> {
  format: DateTimeFormatOptions | ((time: DateTime) => string);
  children: DateTime | string;
  component?: any;
}

const Time: FC<TimeProps> = ({
  format,
  lh,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  children,
  component = "span",
  ...otherProps
}) => {
  const applyFormat = useCallback(
    (time: DateTime) =>
      typeof format === "function" ? format(time) : time.toLocaleString(format),
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
  }, [children, applyFormat]);

  // == Loading
  const loading = !formattedTime;

  return (
    <Skeleton
      visible={!formattedTime}
      className={classes.skeleton}
      {...{ component }}
      {...{ m, mt, mr, mb, ml, mx, my }}
    >
      <Text
        component="time"
        span
        display="inline-block"
        lh={loading ? 1 : lh}
        {...otherProps}
      >
        {formattedTime ?? placeholder}
      </Text>
    </Skeleton>
  );
};

export default Time;
