import type { FC } from "react";
import { DateTime } from "luxon";
import ExpandIcon from "~icons/heroicons/arrows-pointing-out-20-solid";

import { ActionIcon, ScrollArea, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  PensieveSubscriptionDocument,
  PensieveQueryDocument,
  PensieveMessageSender,
} from "~/helpers/graphql";
import type { PensieveMessageFragment } from "~/helpers/graphql";

import PensieveMessage from "./PensieveMessage";
import PensieveChatBox from "./PensieveChatBox";

export type PensieveProps = Omit<BoxProps, "children"> & {
  readonly expandable?: boolean;
};

const Pensieve: FC<PensieveProps> = ({ expandable, sx, ...otherProps }) => {
  const theme = useMantineTheme();
  const [messages, setMessages] = useState<
    Map<string, PensieveMessageFragment>
  >(new Map());

  // == Autoscroll
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoscroll = useCallback(
    (timeout = 200) => {
      setTimeout(() => {
        const viewportEl = viewportRef.current;
        if (viewportEl) {
          if (viewportEl.scrollHeight > viewportEl.clientHeight) {
            viewportEl.scrollTo({
              top: viewportEl.scrollHeight,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }
        }
      }, timeout);
    },
    [viewportRef],
  );

  // == Query
  const onError = useApolloAlertCallback("Failed to load pensieve messages");
  const { loading } = useQuery(PensieveQueryDocument, {
    nextFetchPolicy: "standby",
    onCompleted: ({ messages: incomingMessages }) => {
      setMessages(prevMessages => {
        const messages = new Map(prevMessages);
        incomingMessages.forEach(incomingMessage => {
          messages.set(incomingMessage.id, incomingMessage);
        });
        return messages;
      });
      autoscroll(300);
    },
    onError,
  });

  // == Groupings
  const groups = useMemo(() => {
    const groups = [];
    let currentGroup: PensieveMessageFragment[] = [];
    let lastTimestamp: DateTime | null = null;
    let lastFrom: PensieveMessageSender | null = null;
    messages.forEach(message => {
      const timestamp = DateTime.fromISO(message.timestamp);
      const timestampChanged =
        lastTimestamp &&
        timestamp.diff(lastTimestamp, "seconds").seconds > 3 * 60;
      const senderChanged = lastFrom && lastFrom !== message.from;
      if (timestampChanged || senderChanged) {
        groups.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(message);
      lastTimestamp = timestamp;
      lastFrom = message.from;
    });
    if (lastTimestamp) {
      groups.push(currentGroup);
    }
    return groups;
  }, [messages]);

  // == Subscription
  useSubscription(PensieveSubscriptionDocument, {
    variables: {},
    onData: ({ data: { data } }) => {
      if (data) {
        const { message: incomingMessage } = data;
        if (incomingMessage) {
          setMessages(prevMessages => {
            if (!prevMessages.has(incomingMessage.id)) {
              autoscroll();
            }
            const messages = new Map(prevMessages);
            messages.set(incomingMessage.id, incomingMessage);
            return messages;
          });
        }
      }
    },
    onError: error => {
      console.error(
        "Failed to subscribe to pensieve message updates",
        formatJSON({ error }),
      );
    },
  });

  return (
    <Box
      pos="relative"
      w="100%"
      maw={540}
      display="flex"
      sx={[...packSx(sx), { flexDirection: "column", alignItems: "stretch" }]}
      {...otherProps}
    >
      <Card
        withBorder
        padding={0}
        shadow="sm"
        radius="md"
        w="100%"
        display="flex"
        sx={{ flexGrow: 1, flexDirection: "column", alignItems: "stretch" }}
      >
        <ScrollArea sx={{ flexGrow: 1 }} {...{ viewportRef }}>
          {!isEmpty(groups) ? (
            <Stack m="lg">
              {groups.map(messages => {
                const firstMessage = first(messages);
                invariant(firstMessage, "Group must have at least one message");
                const { id: messageId, from } = firstMessage;
                const fromBot = from === PensieveMessageSender.Bot;
                return (
                  <Stack
                    key={messageId}
                    align={fromBot ? "start" : "end"}
                    spacing={6}
                  >
                    {messages.map(message => (
                      <PensieveMessage key={message.id} {...{ message }} />
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          ) : loading ? (
            <Stack align="start" spacing={6} m="lg">
              {[...new Array(3)].map((_, index) => (
                <Skeleton height="xs" radius="md" key={index}>
                  <Text>Hi this is some placeholder text.</Text>
                </Skeleton>
              ))}
            </Stack>
          ) : (
            <Text size="sm" color="dimmed" m="lg">
              No recent messages.
            </Text>
          )}
        </ScrollArea>
        <Card.Section withBorder px="sm" py="sm">
          <PensieveChatBox />
        </Card.Section>
      </Card>
      {expandable && (
        <Box
          pos="absolute"
          top={-10}
          right={-10}
          bg="dark.6"
          sx={({ radius }) => ({
            borderRadius: radius.xl,
          })}
        >
          <Tooltip label="Open expanded view" withArrow color="dark.9">
            <ActionIcon
              component={Link}
              href="/pensieve"
              size="sm"
              variant="outline"
              color={theme.primaryColor}
              radius="xl"
            >
              <Text component={ExpandIcon} size={11} />
            </ActionIcon>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default Pensieve;
