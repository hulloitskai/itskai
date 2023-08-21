import type { FC, JSXElementConstructor } from "react";
import Linkify from "linkify-react";

import { Text } from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
import type { BoxProps, TextProps } from "@mantine/core";

import { PensieveMessageSender } from "~/helpers/graphql";
import type { PensieveMessageMessageFragment } from "~/helpers/graphql";

import PensieveMessageLike from "./PensieveMessageLike";

export type PensieveMessageProps = Omit<BoxProps, "style" | "children"> & {
  readonly message: PensieveMessageMessageFragment;
};

const PensieveMessage: FC<PensieveMessageProps> = ({
  message,
  sx,
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
          sx={[
            ...packSx(sx),
            ({ transitionTimingFunction }) => ({
              ...(!likes && {
                ".like": {
                  opacity: 0,
                },
                "&:hover": {
                  ".like": {
                    opacity: 1,
                    transition: `opacity 150ms ${transitionTimingFunction}`,
                  },
                },
              }),
            }),
          ]}
          {...(fromBot ? { pr: "xl" } : { pl: 40 })}
          {...{ style }}
          {...otherProps}
        >
          <Stack
            spacing={0}
            id={`pensieve-message-${messageId}`}
            p={6}
            bg="dark.7"
            sx={({ colors, radius }) => ({
              border: `${rem(1)} solid ${
                fromBot ? colors.gray[6] : colors.brand[5]
              }`,
              borderRadius: radius.md,
            })}
          >
            <Group noWrap align="end" spacing="xs" pl={2}>
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
                lh={1.3}
                sx={{ flexGrow: 1, wordBreak: "break-word" }}
              >
                {text}
              </Linkify>
              <Text size="xs" color="dimmed" sx={{ flexShrink: 0 }}>
                <Time format={DateTime.TIME_SIMPLE}>{timestamp}</Time>
              </Text>
            </Group>
            {isEdited && (
              <Text size="xs" color="dimmed" lh={1} sx={{ alignSelf: "end" }}>
                edited
              </Text>
            )}
          </Stack>
          {!fromBot && (
            <Center
              className="like"
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
