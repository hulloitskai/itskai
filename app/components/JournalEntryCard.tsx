import type { JournalEntry } from "~/types";
import { ActionIcon, CopyButton, Text } from "@mantine/core";
import LinkIcon from "~icons/heroicons/link-20-solid";

import NotionContent from "./NotionContent";
import JournalEntryCommentsStack from "./JournalEntryCommentsStack";

import classes from "./JournalEntry.module.css";

export interface JournalEntryCardProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  entry: JournalEntry;
}

const JournalEntryCard: FC<JournalEntryCardProps> = ({
  entry: { id: entryId, title, startedAt, content },
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
        <JournalEntryCommentsStack {...{ entryId }} />
      </Card.Section>
    </Card>
    <Box pos="absolute" top={-10} right={-10}>
      <CopyButton value={routes.home.show.path({ entry_id: entryId })}>
        {({ copied, copy }) => (
          <JournalEntryCardCopyLinkTooltip {...{ copied }}>
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
          </JournalEntryCardCopyLinkTooltip>
        )}
      </CopyButton>
    </Box>
  </Box>
);

export default JournalEntryCard;

interface JournalEntryCardCopyLinkTooltipProps extends PropsWithChildren {
  copied: boolean;
}

const JournalEntryCardCopyLinkTooltip: FC<
  JournalEntryCardCopyLinkTooltipProps
> = ({ copied, children }) => {
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
