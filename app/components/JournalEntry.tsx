import type { FC, PropsWithChildren } from "react";
import { format as formatTimeAgo } from "timeago.js";
import LinkIcon from "~icons/heroicons/link-20-solid";

import { ActionIcon, CopyButton, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { JournalEntryEntryFragment } from "~/helpers/graphql";

import NotionContent from "./NotionContent";
import JournalEntryComments from "./JournalEntryComments";

export type JournalEntryProps = Omit<BoxProps, "children"> & {
  readonly entry: JournalEntryEntryFragment;
};

const JournalEntry: FC<JournalEntryProps> = ({
  entry: { id: entryId, url, title, startedAt, content },
  ...otherProps
}) => {
  const theme = useMantineTheme();

  return (
    <Box pos="relative" w="100%" maw={540} {...otherProps}>
      <Card withBorder padding="lg" shadow="sm" radius="md">
        <Stack spacing="xs">
          <Stack spacing={2}>
            <Title
              order={3}
              size="h4"
              weight={900}
              color="white"
              lh={1.3}
              sx={({ fontFamilyMonospace }) => ({
                fontFamily: fontFamilyMonospace,
              })}
            >
              {title}
            </Title>
            <Text size="xs" color="dimmed">
              written{" "}
              <Time format={time => formatTimeAgo(time.toJSDate())}>
                {startedAt}
              </Time>{" "}
            </Text>
            <NotionContent {...{ content }} />
          </Stack>
        </Stack>
        <Card.Section withBorder inheritPadding mt="sm" py="sm">
          <JournalEntryComments {...{ entryId }} />
        </Card.Section>
      </Card>
      <Box
        pos="absolute"
        top={-10}
        right={-10}
        bg="dark.6"
        sx={({ radius }) => ({
          borderRadius: radius.xl,
        })}
      >
        <CopyButton value={url}>
          {({ copied, copy }) => (
            <JournalEntryCopyTooltip {...{ copied }}>
              <ActionIcon
                size="sm"
                variant="outline"
                color={theme.primaryColor}
                radius="xl"
                onClick={copy}
              >
                <Text component={LinkIcon} size={11} />
              </ActionIcon>
            </JournalEntryCopyTooltip>
          )}
        </CopyButton>
      </Box>
    </Box>
  );
};

export default JournalEntry;

type JournalEntryCopyTooltipProps = PropsWithChildren<{
  readonly copied: boolean;
}>;

const JournalEntryCopyTooltip: FC<JournalEntryCopyTooltipProps> = ({
  copied,
  children,
}) => {
  // == Label
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (copied) {
      setLabel("Copied!");
    } else {
      setTimeout(() => {
        setLabel("Copy permalink");
      }, 100);
    }
  }, [copied]);

  // == Markup
  return (
    <Tooltip
      withArrow
      color="dark.9"
      {...{ label }}
      {...(copied && { opened: true })}
    >
      {children}
    </Tooltip>
  );
};
