import {
  type AnchorProps,
  type BoxProps,
  Spoiler,
  Text,
  Timeline,
  type TimelineProps,
} from "@mantine/core";
import Linkify from "linkify-react";

import RespondIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import { type Status } from "~/types";

import classes from "./FriendTimeline.module.css";

export interface FriendTimelineProps extends Omit<TimelineProps, "children"> {
  statuses: Status[];
  contactPhone: string;
}

const FriendTimeline: FC<FriendTimelineProps> = ({
  statuses,
  contactPhone,
  className,
  ...otherProps
}) => (
  <Timeline
    bulletSize={36}
    classNames={{
      root: cn("FriendTimeline", classes.timeline, className),
      item: classes.timelineItem,
      itemBullet: classes.timelineItemBullet,
    }}
    {...otherProps}
  >
    {statuses.map(status => (
      <Timeline.Item
        key={status.id}
        bullet={
          <span
            style={{
              display: "block",
              fontSize: "var(--mantine-font-size-xl)",
            }}
          >
            {status.emoji}
          </span>
        }
        mod={{ "small-bullet": !status.emoji }}
      >
        <TimelineItemContent {...{ status, contactPhone }} />
      </Timeline.Item>
    ))}
  </Timeline>
);

export default FriendTimeline;

interface TimelineItemContentProps extends BoxProps {
  status: Status;
  contactPhone: string;
}

const TimelineItemContent: FC<TimelineItemContentProps> = ({
  status,
  contactPhone,
  ...otherProps
}) => {
  const [spoilerExpanded, setSpoilerExpanded] = useState(false);
  return (
    <Stack gap={2} {...otherProps}>
      <Spoiler
        maxHeight={120}
        showLabel="Show more"
        hideLabel="Collapse"
        classNames={{
          root: classes.spoiler,
          control: classes.spoilerControl,
        }}
        onExpandedChange={setSpoilerExpanded}
      >
        <Text lh="xs" style={{ whiteSpace: "pre-line" }}>
          <Linkify
            options={{
              target: "_blank",
              rel: "noopener noreferrer nofollow",
              className: cn(Anchor.classes.root, classes.statusLink),
            }}
          >
            {status.text}
          </Linkify>
        </Text>
        <Box
          className={classes.spoilerBottom}
          mod={{ expanded: spoilerExpanded }}
        />
      </Spoiler>
      <Group gap="xs">
        <Time
          format={DateTime.DATETIME_MED}
          size="xs"
          c="dimmed"
          display="block"
        >
          {status.created_at}
        </Time>
        <Divider orientation="vertical" my={1} />
        <RespondAnchor {...{ contactPhone, status }} size="xs" />
      </Group>
    </Stack>
  );
};

interface RespondAnchorProps
  extends AnchorProps,
    Omit<ComponentPropsWithoutRef<"a">, "style" | "children" | "color"> {
  contactPhone: string;
  status: Status;
}

const RespondAnchor: FC<RespondAnchorProps> = ({
  contactPhone,
  status,
  className,
  ...otherProps
}) => {
  const href = useMemo(() => {
    const quotedText =
      status.text
        .split("\n")
        .map(line => `> ${line}`)
        .join("\n") + "\n\n";
    return `sms:${contactPhone}?body=${encodeURIComponent(quotedText)}`;
  }, [contactPhone, status.text]);
  return (
    <Anchor
      {...{ href }}
      className={cn(classes.respondAnchor, className)}
      {...otherProps}
    >
      <Box component={RespondIcon} fz={9} mr={4} />
      Respond
    </Anchor>
  );
};
