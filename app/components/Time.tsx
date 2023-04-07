import type { FC } from "react";

import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

import { DateTime } from "luxon";
import type { DateTimeFormatOptions } from "luxon";

export type TimeProps = Omit<TextProps, "children"> & {
  readonly format: DateTimeFormatOptions;
  readonly children: DateTime | string;
};

const Time: FC<TimeProps> = ({ format, lh, children, ...otherProps }) => {
  const placeholder = useMemo(
    () => DateTime.fromSeconds(0, { zone: "utc" }).toLocaleString(format),
    [format],
  );
  const [formattedTime, setFormattedTime] = useState<string | undefined>();
  const loading = !formattedTime;
  useEffect(() => {
    const dateTime =
      typeof children === "string" ? DateTime.fromISO(children) : children;
    setFormattedTime(dateTime.toLocaleString(format));
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
      <Text lh={loading ? 1 : lh} {...otherProps}>
        {formattedTime ?? placeholder}
      </Text>
    </Skeleton>
  );
};

export default Time;
