import type { FC } from "react";
import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { PensieveMessageMessageFragment } from "~/helpers/graphql";
import { useTimeout } from "@mantine/hooks";

export type PensieveMessageProps = Omit<BoxProps, "children"> & {
  readonly message: PensieveMessageMessageFragment;
};

const PensieveMessage: FC<PensieveMessageProps> = ({
  message: { id: messageId, /* from, */ text, timestamp },
  sx,
  ...otherProps
}) => {
  const [mounted, setMounted] = useState(false);
  useTimeout(() => setMounted(true), 100, { autoInvoke: true });
  return (
    <Transition transition="pop" {...{ mounted }}>
      {style => (
        <Group
          id={`pensieve-message-${messageId}`}
          noWrap
          spacing="xs"
          px={8}
          py={4}
          bg="dark.7"
          sx={[
            ...packSx(sx),
            ({ colors, radius }) => ({
              border: `${rem(1)} solid ${colors.brand[5]}`,
              borderRadius: radius.md,
            }),
          ]}
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
      )}
    </Transition>
  );
};

export default PensieveMessage;
