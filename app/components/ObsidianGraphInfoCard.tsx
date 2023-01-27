import type { FC } from "react";

import { Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import ObsidianNoteTag from "./ObsidianNoteTag";

import ClockIcon from "~icons/heroicons/clock-20-solid";

import type { Widen } from "~/helpers/utils";
import type { ObsidianGraphEntryFragment } from "~/queries";

export type ObsidianGraphInfoCardProps = Omit<CardProps, "children"> & {
  readonly entry: ObsidianGraphEntryFragment;
};

const ObsidianGraphInfoCard: FC<ObsidianGraphInfoCardProps> = ({
  entry,
  ...otherProps
}) => {
  const {
    type,
    name,
    modifiedAt: modifiedAtISO,
    tags = [],
    blurb,
  } = entry as Widen<ObsidianGraphEntryFragment>;

  const modifiedAgo = useMemo(() => {
    if (modifiedAtISO) {
      return DateTime.fromISO(modifiedAtISO).toRelativeCalendar();
    }
  }, [modifiedAtISO]);
  const tag = useMemo(() => first(tags), [tags]);

  // == Markup
  return (
    <Card p="xs" radius="md" withBorder w={300} {...otherProps}>
      <Group spacing={8} noWrap>
        <Text size="sm" weight={500} lineClamp={1}>
          {name}
        </Text>
        {!!tag && <ObsidianNoteTag size="xs">{tag}</ObsidianNoteTag>}
      </Group>
      {type === "ObsidianStub" && (
        <Text size="xs" color="gray.6" sx={{ lineHeight: 1.4 }}>
          This is entry is from the future; it has yet to be written!
        </Text>
      )}
      {!!modifiedAgo && (
        <Group spacing={4} mt={-3}>
          <Box sx={({ colors }) => ({ color: colors.gray[6] })}>
            <ClockIcon width={12} height={12} />
          </Box>
          <Text size="xs" color="dimmed" sx={{ lineHeight: 1.4 }}>
            Updated {modifiedAgo}
          </Text>
        </Group>
      )}
      {!!blurb && (
        <>
          <Divider
            mt={2}
            mb={4}
            sx={({ colors }) => ({ borderColor: colors.gray[3] })}
          />
          <Text lineClamp={4} size="xs" color="gray.7" sx={{ lineHeight: 1.4 }}>
            {blurb}
          </Text>
        </>
      )}
    </Card>
  );
};

export default ObsidianGraphInfoCard;
