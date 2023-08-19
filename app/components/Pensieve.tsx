import type { FC } from "react";

import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

// import { PensieveMessageFrom } from "~/helpers/graphql";
import {
  PensieveSubscriptionDocument,
  type PensieveMessageFragment,
} from "~/helpers/graphql";

export type PensieveProps = Omit<BoxProps, "children"> & {
  readonly initialMessages: ReadonlyArray<PensieveMessageFragment>;
};

const Pensieve: FC<PensieveProps> = ({
  initialMessages,
  sx,
  ...otherProps
}) => {
  const [messages, setMessages] = useState(initialMessages);

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
      padding="lg"
      shadow="sm"
      radius="md"
      mah={375}
      w="100%"
      maw={540}
      sx={[...packSx(sx), { overflowY: "auto" }]}
      {...otherProps}
    >
      <Stack spacing={8}>
        {messages.map(({ id: messageId, /* from, */ text, timestamp }) => (
          <Group
            key={messageId}
            spacing="xs"
            px={8}
            py={4}
            bg="dark.7"
            sx={({ colors, radius }) => ({
              border: `${rem(1)} solid ${colors.brand[5]}`,
              borderRadius: radius.md,
              alignSelf: "end",
            })}
          >
            {/* <Text>{from === PensieveMessageFrom.User ? "Kai" : "The World"}</Text> */}
            <Text size="sm">{text}</Text>
            <Text size="xs" color="dimmed">
              <Time format={DateTime.TIME_SIMPLE}>{timestamp}</Time>
            </Text>
          </Group>
        ))}
      </Stack>
    </Card>
  );
};

export default Pensieve;
