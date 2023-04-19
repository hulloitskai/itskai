import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";

import { Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import type { JournalEntryEntryFragment } from "~/queries";

import NotionContent from "./NotionContent";
import JournalEntryComments from "./JournalEntryComments";

export type JournalEntryProps = Omit<CardProps, "children"> & {
  readonly page: JournalEntryEntryFragment;
};

const JournalEntry: FC<JournalEntryProps> = ({ page, ...otherProps }) => {
  const { id: entryId, title, createdAt, blocks } = page;
  return (
    <Card withBorder padding="lg" shadow="sm" radius="md" {...otherProps}>
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
  );
};

export default JournalEntry;
