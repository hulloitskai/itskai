import type { FC } from "react";
import { DateTime } from "luxon";

import { ScrollArea, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  PensieveSubscriptionDocument,
  PensieveQueryDocument,
} from "~/helpers/graphql";
import {
  PensieveMessageFragment,
  PensieveMessageSender,
} from "~/helpers/graphql";

import PensieveMessage from "./PensieveMessage";
import PensieveChatBox from "./PensieveChatBox";

export type PensieveProps = Omit<BoxProps, "children">;

const Pensieve: FC<PensieveProps> = ({ sx, ...otherProps }) => {
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
          viewportEl.scrollTo({
            top: viewportEl.scrollHeight,
            behavior: "smooth",
          });
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
        lastTimestamp && timestamp.diff(lastTimestamp, "minutes").minutes > 2;
      const fromChanged = lastFrom && lastFrom !== message.from;
      if (timestampChanged || fromChanged) {
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
    <Card
      withBorder
      padding={0}
      shadow="sm"
      radius="md"
      w="100%"
      maw={540}
      sx={[...packSx(sx), { overflowY: "auto" }]}
      {...otherProps}
    >
      <ScrollArea h={325} {...{ viewportRef }}>
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
          <Stack align="start" spacing={4} m="lg">
            {[...new Array(3)].map((_, index) => (
              <Skeleton height="xs" key={index}>
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
  );
};

export default Pensieve;
