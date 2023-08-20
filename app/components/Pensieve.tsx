import type { FC } from "react";
import { DateTime } from "luxon";

import { ScrollArea, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  PensieveSubscriptionDocument,
  PensieveQueryDocument,
} from "~/helpers/graphql";
import type { PensieveMessageFragment } from "~/helpers/graphql";

import PensieveMessage from "./PensieveMessage";

export type PensieveProps = Omit<BoxProps, "children">;

const Pensieve: FC<PensieveProps> = ({ sx, ...otherProps }) => {
  const [messages, setMessages] = useState<PensieveMessageFragment[]>([]);

  // == Query
  const onError = useApolloAlertCallback("Failed to load pensieve messages");
  const { loading } = useQuery(PensieveQueryDocument, {
    onCompleted: ({ messages }) => {
      setMessages(prevMessages => [...prevMessages, ...messages]);
    },
    onError,
  });

  // == Autoscroll
  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      const viewportEl = viewportRef.current;
      if (viewportEl) {
        viewportEl.scrollTo({
          top: viewportEl.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 120);
  }, [messages]);

  // == Groupings
  const groups = useMemo(() => {
    const groups = [];
    let currentGroup: PensieveMessageFragment[] = [];
    let lastTimestamp: DateTime | null = null;
    messages.forEach(message => {
      const timestamp = DateTime.fromISO(message.timestamp);
      if (
        lastTimestamp &&
        timestamp.diff(lastTimestamp, "minutes").minutes > 2
      ) {
        groups.push(currentGroup);
        currentGroup = [];
        lastTimestamp = null;
      }
      currentGroup.push(message);
      lastTimestamp = timestamp;
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
        const { message } = data;
        if (message) {
          setMessages(prevMessages => [...prevMessages, message]);
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
          <Stack spacing="sm" m="lg">
            {groups.map(messages => {
              const firstMessage = first(messages);
              invariant(firstMessage, "Group must have at least one message");
              return (
                <Stack key={firstMessage.id} align="end" spacing={6}>
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
    </Card>
  );
};

export default Pensieve;
