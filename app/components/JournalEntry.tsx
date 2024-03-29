import type { FC, PropsWithChildren } from "react";
import LinkIcon from "~icons/heroicons/link-20-solid";

import { ActionIcon, CopyButton, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { JournalEntryEntryFragment } from "~/helpers/graphql";

import NotionContent from "./NotionContent";
import JournalEntryComments from "./JournalEntryComments";

import classes from "./JournalEntry.module.css";

export type JournalEntryProps = BoxProps & {
  readonly entry: JournalEntryEntryFragment;
};

const JournalEntry: FC<JournalEntryProps> = ({
  entry: { id: entryId, url, title, startedAt, content },
  ...otherProps
}) => (
  <Box pos="relative" w="100%" maw={540} {...otherProps}>
    <Card withBorder padding="lg" shadow="sm">
      <Stack gap="xs">
        <Stack gap={2}>
          <Title
            order={3}
            size="h4"
            ff="var(--mantine-font-family-monospace)"
            fw={900}
            lh={1.3}
            className={classes.title}
          >
            {title}
          </Title>
          <Text size="xs" c="dimmed">
            written <TimeAgo>{startedAt}</TimeAgo>
          </Text>
          <NotionContent {...{ content }} />
        </Stack>
      </Stack>
      <Card.Section withBorder inheritPadding mt="sm" py="sm">
        <JournalEntryComments {...{ entryId }} />
      </Card.Section>
    </Card>
    <Box pos="absolute" top={-10} right={-10}>
      <CopyButton value={url}>
        {({ copied, copy }) => (
          <JournalEntryCopyLinkTooltip {...{ copied }}>
            <ActionIcon
              size="sm"
              variant="outline"
              color="primary"
              bg="var(--mantine-color-body)"
              radius="xl"
              onClick={copy}
            >
              <Text component={LinkIcon} fz={11} />
            </ActionIcon>
          </JournalEntryCopyLinkTooltip>
        )}
      </CopyButton>
    </Box>
  </Box>
);

export default JournalEntry;

type JournalEntryCopyLinkTooltipProps = PropsWithChildren<{
  readonly copied: boolean;
}>;

const JournalEntryCopyLinkTooltip: FC<JournalEntryCopyLinkTooltipProps> = ({
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

  return (
    <Tooltip
      withArrow
      color="primary"
      {...{ label }}
      {...(copied && { opened: true })}
    >
      {children}
    </Tooltip>
  );
};
