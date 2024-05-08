import type { ComponentPropsWithoutRef, FC } from "react";
import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

import { DateTime } from "luxon";
import type { DateTimeFormatOptions } from "luxon";

import classes from "./Time.module.css";

export type TimeProps = Omit<TextProps, "span"> &
  Omit<ComponentPropsWithoutRef<"div">, "children"> & {
    readonly format: DateTimeFormatOptions | ((time: DateTime) => string);
    readonly children: DateTime | string;
  };

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
      {...{ component: "span" }}
      {...{ m, mt, mr, mb, ml, mx, my }}
    >
      <Text span display="inline-block" lh={loading ? 1 : lh} {...otherProps}>
        {formattedTime ?? placeholder}
      </Text>
    </Skeleton>
  );
};

export default Time;
