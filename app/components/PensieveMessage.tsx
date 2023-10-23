import type { FC, JSXElementConstructor } from "react";
import Linkify from "linkify-react";

import { Text } from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
import type { BoxProps, TextProps } from "@mantine/core";

import { PensieveMessageSender } from "~/helpers/graphql";
import type { PensieveMessageMessageFragment } from "~/helpers/graphql";

import PensieveMessageLike from "./PensieveMessageLike";

import classes from "./PensieveMessage.module.css";

export type PensieveMessageProps = Omit<BoxProps, "style" | "children"> & {
  readonly message: PensieveMessageMessageFragment;
};

const PensieveMessage: FC<PensieveMessageProps> = ({
  message,
  ...otherProps
}) => {
  const { id: messageId, from, text, timestamp, likes, isEdited } = message;
  const fromBot = from === PensieveMessageSender.Bot;
  const [mounted, setMounted] = useState(false);
  useTimeout(() => setMounted(true), 100, { autoInvoke: true });
  return (
    <Transition transition="pop" {...{ mounted }}>
      {style => (
        <Box
          pos="relative"
          className={classes.root}
          {...(fromBot ? { pr: "xl" } : { pl: 40 })}
          {...(likes && { "data-has-likes": true })}
          {...{ style }}
          {...otherProps}
        >
          <Stack
            gap={0}
            id={`pensieve-message-${messageId}`}
            p={6}
            bg="var(--mantine-color-dark-filled)"
            style={{
              "--pm-border-color": fromBot
                ? "var(--mantine-color-gray-6)"
                : "var(--mantine-color-primary-5)",
              border: `${rem(1)} solid var(--pm-border-color)`,
              borderRadius: "var(--mantine-radius-md)",
            }}
          >
            <Group align="end" gap="xs" wrap="nowrap" pl={2}>
              <Linkify<TextProps, JSXElementConstructor<TextProps>>
                as={Text}
                options={{
                  render: ({ content, attributes }) => (
                    <Anchor
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      {...attributes}
                    >
                      {content}
                    </Anchor>
                  ),
                }}
                size="sm"
                display="block"
                lh={1.3}
                className={classes.text}
              >
                {text}
              </Linkify>
              <Box lh={1} style={{ flexShrink: 0 }}>
                <Time format={DateTime.TIME_SIMPLE} size="xs" c="dimmed">
                  {timestamp}
                </Time>
              </Box>
            </Group>
            {isEdited && (
              <Text size="xs" c="dimmed" lh={1} style={{ alignSelf: "end" }}>
                edited
              </Text>
            )}
          </Stack>
          {!fromBot && (
            <Center
              className={classes.like}
              pos="absolute"
              left={34}
              top={0}
              bottom={0}
            >
              <Box pos="relative">
                <PensieveMessageLike
                  pos="absolute"
                  right={0}
                  top={-12}
                  {...{ message }}
                />
              </Box>
            </Center>
          )}
        </Box>
      )}
    </Transition>
  );
};

export default PensieveMessage;
