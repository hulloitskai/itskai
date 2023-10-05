import type { FC } from "react";
import { DateTime } from "luxon";
import { format as formatTimeAgo } from "timeago.js";

import type { TextProps } from "@mantine/core";
import { Text } from "@mantine/core";

export type TimeAgoProps = TextProps & {
  readonly children: string | DateTime;
};

const TimeAgo: FC<TimeAgoProps> = ({ children, ...otherProps }) => {
  const date = useMemo(() => {
    const time =
      typeof children === "string" ? DateTime.fromISO(children) : children;
    return time.toJSDate();
  }, [children]);
  const [text, setText] = useState(() => formatTimeAgo(date));
  useEffect(() => {
    const interval = setInterval(() => {
      setText(formatTimeAgo(date));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [date]);
  return (
    <Text component="time" {...otherProps}>
      {text}
    </Text>
  );
};

export default TimeAgo;
