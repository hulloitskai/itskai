import type { ComponentPropsWithoutRef, FC } from "react";

import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

import { DateTime } from "luxon";
import type { DateTimeFormatOptions } from "luxon";

export type TimeProps = Omit<TextProps, "children"> &
  Omit<ComponentPropsWithoutRef<"div">, "children"> & {
    readonly format: DateTimeFormatOptions | ((time: DateTime) => string);
    readonly children: DateTime | string;
  };

const Time: FC<TimeProps> = ({ format, lh, children, ...otherProps }) => {
  const applyFormat = (time: DateTime) =>
    typeof format === "function" ? format(time) : time.toLocaleString(format);
  const placeholder = useMemo(
    () => applyFormat(DateTime.fromSeconds(0, { zone: "utc" })),
    [format],
  );
  const [formattedTime, setFormattedTime] = useState<string | undefined>();
  const loading = !formattedTime;
  useEffect(() => {
    const time =
      typeof children === "string" ? DateTime.fromISO(children) : children;
    setFormattedTime(applyFormat(time));
  }, [children, format]);
  return (
    <Skeleton
      visible={!formattedTime}
      sx={{
        display: "inline",
        ...(loading && {
          display: "inline-block",
          height: "min-content",
          width: "fit-content",
          verticalAlign: "middle",
        }),
      }}
    >
      <Text display="inline" lh={loading ? 1 : lh} {...otherProps}>
        {formattedTime ?? placeholder}
      </Text>
    </Skeleton>
  );
};

export default Time;
