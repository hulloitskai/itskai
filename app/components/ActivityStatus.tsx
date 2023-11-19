import type { FC } from "react";
import CodeIcon from "~icons/heroicons/code-bracket-20-solid";

import { HoverCard, Image, Text } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import type { BoxProps } from "@mantine/core";

import { ActivityStatusBadgeSubscriptionDocument } from "~/helpers/graphql";

import heartSrc from "~/assets/images/heart.png";

export type ActivityStatusProps = BoxProps;

const ActivityStatus: FC<ActivityStatusProps> = ({ ...otherProps }) => {
  const { online } = useNetwork();

  // == Query
  const { data } = useSubscription(ActivityStatusBadgeSubscriptionDocument, {
    variables: {},
    onError: error => {
      console.error(
        "Failed to subscribe to activity status updates",
        formatJSON({ error }),
      );
    },
  });
  const { activityStatus } = data ?? {};
  const showStatus = !!activityStatus || !online;

  // == Status Text
  const [statusText, setStatusText] = useState(activityStatus || "");
  useEffect(() => {
    if (!online) {
      setStatusText("You are offline :(");
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
          return (
            <Center h="100%" {...{ style }}>
              <Text size="xs" c={online ? "gray.6" : "red.6"}>
                {statusText}
              </Text>
            </Center>
          );
        }}
      </Transition>
      <Transition transition="slide-up" mounted={showTagline}>
        {style => (
          <Center h="100%" {...{ style }}>
            <HoverCard withArrow>
              <HoverCard.Target>
                <Group justify="center" gap={4} wrap="nowrap">
                  <Text size="xs" c="gray.6" fw={500}>
                    Made by{" "}
                    <Text span fw={700}>
                      Kai
                    </Text>{" "}
                    with
                  </Text>
                  <Image src={heartSrc} width={12} height={12} />
                </Group>
              </HoverCard.Target>
              <HoverCard.Dropdown
                style={({ radius }) => ({ borderRadius: radius.md })}
              >
                <Stack gap={6} align="center">
                  <Text size="sm" lh={1.4}>
                    Did you know this website is{" "}
                    <Text span inherit fw={700}>
                      open source
                    </Text>
                    ?
                  </Text>
                  <Button
                    component="a"
                    href="https://github.com/hulloitskai/itskai"
                    target="_blank"
                    size="compact-xs"
                    leftSection={<CodeIcon />}
                    radius="xl"
                    px={8}
                    py={4}
                  >
                    Take me to the code!
                  </Button>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
          </Center>
        )}
      </Transition>
    </Box>
  );
};

export default ActivityStatus;
