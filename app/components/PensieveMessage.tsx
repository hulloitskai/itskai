import type { FC } from "react";
import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { PensieveMessageSender } from "~/helpers/graphql";
import type { PensieveMessageMessageFragment } from "~/helpers/graphql";
import { useTimeout } from "@mantine/hooks";

export type PensieveMessageProps = Omit<BoxProps, "style" | "children"> & {
  readonly message: PensieveMessageMessageFragment;
};

const PensieveMessage: FC<PensieveMessageProps> = ({
  message: { id: messageId, from, text, timestamp, isEdited },
  sx,
  ...otherProps
}) => {
  const fromBot = from === PensieveMessageSender.Bot;
  const [mounted, setMounted] = useState(false);
  useTimeout(() => setMounted(true), 100, { autoInvoke: true });
  return (
    <Transition transition="pop" {...{ mounted }}>
      {style => (
        <Stack
          spacing={0}
          id={`pensieve-message-${messageId}`}
          px={8}
          py={4}
          bg="dark.7"
          sx={[
            ...packSx(sx),
            ({ colors, radius }) => ({
              border: `${rem(1)} solid ${
                fromBot ? colors.gray[6] : colors.brand[5]
              }`,
              borderRadius: radius.md,
            }),
          ]}
        >
          <Group
            noWrap
            align="start"
            spacing="xs"
            {...{ style }}
            {...otherProps}
          >
            {/* <Text>{from === PensieveMessageFrom.User ? "Kai" : "The World"}</Text> */}
            <Text size="sm" lh={1.3} sx={{ flexGrow: 1 }}>
              {text}
            </Text>
            <Text size="xs" color="dimmed" sx={{ flexShrink: 0 }}>
              <Time format={DateTime.TIME_SIMPLE}>{timestamp}</Time>
            </Text>
          </Group>
          {isEdited && (
            <Text
              size="xs"
              color="dimmed"
              weight={500}
              lh={1}
              sx={{ alignSelf: "end" }}
            >
              edited
            </Text>
          )}
        </Stack>
      )}
    </Transition>
  );
};

export default PensieveMessage;
