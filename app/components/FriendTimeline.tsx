import {
  type AnchorProps,
  Text,
  Timeline,
  type TimelineProps,
} from "@mantine/core";

import RespondIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import { type Status } from "~/types";

export interface FriendTimelineProps extends Omit<TimelineProps, "children"> {
  statuses: Status[];
  contactPhone: string;
}

const FriendTimeline: FC<FriendTimelineProps> = ({
  statuses,
  contactPhone,
  ...otherProps
}) => (
  <Timeline bulletSize={24} {...otherProps}>
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
      >
        <Stack gap={2}>
          <Text lh="xs" style={{ whiteSpace: "pre-line" }}>
            {status.text}
          </Text>
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
            <RespondAnchor {...{ contactPhone, status }} size="xs" c="dark.0" />
          </Group>
        </Stack>
      </Timeline.Item>
    ))}
  </Timeline>
);

export default FriendTimeline;

interface RespondAnchorProps
  extends AnchorProps,
    Omit<ComponentPropsWithoutRef<"a">, "style" | "children" | "color"> {
  contactPhone: string;
  status: Status;
}

const RespondAnchor: FC<RespondAnchorProps> = ({
  contactPhone,
  status,
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
    <Anchor {...{ href }} {...otherProps}>
      <Box component={RespondIcon} fz={9} mr={4} />
      Respond
    </Anchor>
  );
};
