import type { FC, PropsWithChildren } from "react";
import { format as formatTimeAgo } from "timeago.js";
import LinkIcon from "~icons/heroicons/link-20-solid";

import { ActionIcon, CopyButton, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { JournalEntryEntryFragment } from "~/queries";

import NotionContent from "./NotionContent";
import JournalEntryComments from "./JournalEntryComments";

export type JournalEntryProps = BoxProps & {
  readonly page: JournalEntryEntryFragment;
};

const JournalEntry: FC<JournalEntryProps> = ({ page, ...otherProps }) => {
  const { id: entryId, url, title, createdAt, blocks } = page;

  // == Markup
  return (
    <Box id={entryId} pos="relative" mx={4} {...otherProps}>
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
                {createdAt}
              </Time>{" "}
            </Text>
            <NotionContent {...{ blocks }} />
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
                color="pink"
                radius="xl"
                onClick={copy}
              >
                <Box component={LinkIcon} w={14} h={14} />
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
