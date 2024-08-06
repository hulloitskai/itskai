import type { CSSProperties } from "react";
import { DateTime } from "luxon";
import ExpandIcon from "~icons/heroicons/arrows-pointing-out-20-solid";

import { ActionIcon, ScrollArea, Text } from "@mantine/core";

import PensieveMessage from "./PensieveMessage";
import PensieveChatBox from "./PensieveChatBox";

type PensieveMessageFragment = any;
enum PensieveMessageSender {
  Bot = "bot",
  User = "user",
}

export interface PensieveProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  expandable?: boolean;
  onLoadMessages?: (messages: ReadonlyArray<PensieveMessageFragment>) => void;
  onNewMessage?: () => void;
}

const Pensieve: FC<PensieveProps> = ({
  expandable,
  onLoadMessages, // eslint-disable-line @typescript-eslint/no-unused-vars
  onNewMessage, // eslint-disable-line @typescript-eslint/no-unused-vars
  style,
  ...otherProps
}) => {
  const [messages /* setMessages */] = useState<
    Map<string, PensieveMessageFragment>
  >(new Map());

  // == Autoscroll
  const viewportRef = useRef<HTMLDivElement>(null);
  // const autoScroll = useCallback((timeout = 200) => {
  //   setTimeout(() => {
  //     const viewportEl = viewportRef.current;
  //     if (viewportEl && viewportEl.scrollHeight > viewportEl.clientHeight) {
  //       viewportEl.scrollTo({
  //         top: viewportEl.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     }
  //   }, timeout);
  // }, []);

  // == Messages loading
  // const onLoadMessagesError = useApolloAlertCallback("Failed to load messages");
  // const { loading: loadingMessages } = useQuery(PensieveQueryDocument, {
  //   nextFetchPolicy: "standby",
  //   onCompleted: ({ messages: incomingMessages }) => {
  //     setMessages(prevMessages => {
  //       const messages = new Map(prevMessages);
  //       incomingMessages.forEach(incomingMessage => {
  //         messages.set(incomingMessage.id, incomingMessage);
  //       });
  //       return messages;
  //     });
  //     autoScroll(300);
  //     if (onLoadMessages) {
  //       onLoadMessages(incomingMessages);
  //     }
  //   },
  //   onError: onLoadMessagesError,
  // });

  // == Groupings
  const groups = useMemo(() => {
    const groups = [];
    let currentGroup: PensieveMessageFragment[] = [];
    let lastTimestamp: DateTime | null = null;
    let lastFrom: PensieveMessageSender | null = null;
    messages.forEach(message => {
      const timestamp = DateTime.fromISO(message.timestamp);
      const timestampChanged =
        lastTimestamp && timestamp.diff(lastTimestamp).as("seconds") > 3 * 60;
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

  // == Watching Messages
  // useSubscription(PensieveSubscriptionDocument, {
  //   variables: {},
  //   onData: ({ data: { data, error } }) => {
  //     if (data) {
  //       const { message: incomingMessage } = data;
  //       if (incomingMessage) {
  //         const isNewMessage = !messages.has(incomingMessage.id);
  //         setMessages(prevMessages => {
  //           const messages = new Map(prevMessages);
  //           messages.set(incomingMessage.id, incomingMessage);
  //           return messages;
  //         });
  //         if (isNewMessage) {
  //           autoScroll();
  //           if (onNewMessage) {
  //             onNewMessage();
  //           }
  //         }
  //       } else if (error) {
  //         console.error("Error during message update", formatJSON({ error }));
  //       }
  //     }
  //   },
  //   onError: error => {
  //     console.error("Failed to watch message updates", formatJSON({ error }));
  //   },
  // });

  const loadingMessages = false;
  return (
    <Box
      id="pensieve"
      pos="relative"
      w="100%"
      maw={540}
      display="flex"
      style={[style, { flexDirection: "column", alignItems: "stretch" }]}
      {...otherProps}
    >
      <Card
        withBorder
        padding={0}
        shadow="sm"
        w="100%"
        display="flex"
        style={{ flexGrow: 1, flexDirection: "column", alignItems: "stretch" }}
      >
        <ScrollArea {...{ viewportRef }} style={{ flexGrow: 1 }}>
          {!isEmpty(groups) ? (
            <Stack m="lg">
              {groups.map(messages => {
                const firstMessage = first(messages);
                invariant(firstMessage, "Group must have at least one message");
                const { id: messageId, from } = firstMessage;
                const fromBot = from === PensieveMessageSender.Bot;
                const align: CSSProperties["alignItems"] = fromBot
                  ? "end"
                  : "start";
                return (
                  <Stack key={messageId} {...{ align }} gap={4}>
                    <Text
                      size="xs"
                      fw={800}
                      c={fromBot ? "primary.6" : "gray."}
                    >
                      {fromBot ? "The universe (you)" : "Kai"}
                    </Text>
                    <Stack gap={6} {...{ align }}>
                      {messages.map(message => (
                        <PensieveMessage key={message.id} {...{ message }} />
                      ))}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          ) : loadingMessages ? (
            <Stack gap={6} m="lg">
              {[...new Array(3)].map((_, index) => (
                <Skeleton height={36} radius="default" key={index} />
              ))}
            </Stack>
          ) : (
            <Text size="sm" c="dimmed" m="lg">
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
          style={({ radius }) => ({ borderRadius: radius.xl })}
        >
          <Tooltip label="Open expanded view" withArrow color="primary">
            <ActionIcon
              component={Link}
              href="/pensieve"
              size="sm"
              variant="outline"
              color="primary"
              bg="var(--mantine-color-body)"
              radius="xl"
            >
              <Text component={ExpandIcon} fz={11} />
            </ActionIcon>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default Pensieve;
