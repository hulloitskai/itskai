import { ActionIcon, CopyButton, Text } from "@mantine/core";

import LinkIcon from "~icons/heroicons/link-20-solid";

import { type NotionJournalEntry } from "~/types";

import NotionContent from "./NotionContent";
import JournalEntryCommentsStack from "./NotionJournalEntryCommentsStack";

import classes from "./NotionJournalEntry.module.css";

export interface NotionJournalEntryCardProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  entry: NotionJournalEntry;
  onCopy?: () => void;
}

const NotionJournalEntryCard: FC<NotionJournalEntryCardProps> = ({
  entry,
  onCopy,
  ...otherProps
}) => (
  <Box pos="relative" w="100%" maw={540} {...otherProps}>
    <Card withBorder padding="lg" shadow="sm">
      <Stack gap="xs">
        <Stack gap={2}>
          <Title
            order={3}
            size="h4"
            ff="monospace"
            fw={900}
            lh={1.3}
            className={classes.title}
          >
            {entry.title}
          </Title>
          <Text size="xs" c="dimmed">
            written <TimeAgo>{entry.started_at}</TimeAgo>
          </Text>
          <NotionContent content={entry.content} />
        </Stack>
      </Stack>
      <Card.Section withBorder inheritPadding mt="sm" py="sm">
        <JournalEntryCommentsStack entryId={entry.id} />
      </Card.Section>
    </Card>
    <Box pos="absolute" top={-10} right={-10}>
      <CopyButton value={entry.url}>
        {({ copied, copy }) => (
          <JournalEntryCardCopyLinkTooltip {...{ copied }}>
            <ActionIcon
              size="sm"
              variant="outline"
              color="primary"
              bg="var(--mantine-color-body)"
              radius="xl"
              onClick={() => {
                copy();
                onCopy?.();
              }}
            >
              <Text component={LinkIcon} fz={11} />
            </ActionIcon>
          </JournalEntryCardCopyLinkTooltip>
        )}
      </CopyButton>
    </Box>
  </Box>
);

export default NotionJournalEntryCard;

interface JournalEntryCardCopyLinkTooltipProps {
  copied: boolean;
}

const JournalEntryCardCopyLinkTooltip: FC<
  PropsWithChildren<JournalEntryCardCopyLinkTooltipProps>
> = ({ children, copied }) => {
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
    <Tooltip color="primary" {...{ label }} {...(copied && { opened: true })}>
      {children}
    </Tooltip>
  );
};
