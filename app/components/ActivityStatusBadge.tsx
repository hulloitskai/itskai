import type { FC } from "react";
import { useNetwork } from "@mantine/hooks";

import { DefaultMantineColor, Image, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { ActivityStatusBadgeSubscriptionDocument } from "~/queries";

import logoPath from "~/assets/images/logo-plain.png";

export type ActivityStatusBadgeProps = Omit<BoxProps, "children">;

const ActivityStatusBadge: FC<ActivityStatusBadgeProps> = ({
  ...otherProps
}) => {
  const { online } = useNetwork();

  // == Query
  const { data } = useSubscription(ActivityStatusBadgeSubscriptionDocument, {
    variables: {},
    onError: error => {
      console.error("Failed to subscribe to activity status updates", {
        error,
      });
    },
  });
  const { activityStatus } = data ?? {};
  const showStatus = !!activityStatus || !online;

  // == Status Text
  const [statusText, setStatusText] = useState(activityStatus || "");
  useEffect(() => {
    if (!online) {
      setStatusText("Offline");
    } else if (activityStatus) {
      setStatusText(activityStatus);
    }
  }, [activityStatus, online]);

  // == Tagline
  const [showTagline, setShowTagline] = useState(!showStatus);

  // == Markup
  return (
    <Box {...otherProps}>
      <Transition
        transition="slide-up"
        mounted={showStatus}
        onEnter={() => setShowTagline(false)}
        onExited={() => setShowTagline(true)}
      >
        {style => {
          const color: DefaultMantineColor = online ? "orange" : "red";
          return (
            <Center h="100%" {...{ style }}>
              <Badge
                size="xs"
                variant="dot"
                sx={({ colors, fn }) => ({
                  borderColor: fn.darken(colors[color]![4], 0.3),
                })}
                {...{ color }}
              >
                {statusText}
              </Badge>
            </Center>
          );
        }}
      </Transition>
      <Transition transition="slide-up" mounted={showTagline}>
        {style => (
          <Center h="100%" {...{ style }}>
            <Group spacing={0} sx={{ flexShrink: 0 }}>
              <Text size="xs" weight={500} color="gray.6">
                made with
              </Text>
              <Image src={logoPath} width={24} height={24} />
            </Group>
          </Center>
        )}
      </Transition>
    </Box>
  );
};

export default ActivityStatusBadge;
