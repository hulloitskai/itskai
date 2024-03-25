import type { FC } from "react";

import type { CardProps } from "@mantine/core";
import { Spoiler, Text } from "@mantine/core";

import type { PensieveRecordingCardRecordingFragment } from "~/helpers/graphql";
import { PensieveRecordingCardSubscriptionDocument } from "~/helpers/graphql";

export type PensieveRecordingCardProps = Omit<CardProps, "children"> & {
  readonly recording: PensieveRecordingCardRecordingFragment;
};

const PensieveRecordingCard: FC<PensieveRecordingCardProps> = ({
  recording: { id: recordingId, createdAt, audio },
  ...otherProps
}) => {
  const { data } = useSubscription(PensieveRecordingCardSubscriptionDocument, {
    variables: {
      id: recordingId,
    },
    onError: error => {
      console.error(
        "Failed to subscribe to recording updates",
        formatJSON({ error }),
      );
    },
  });
  const { transcription } = data?.recording ?? {};

  return (
    <Card withBorder {...otherProps}>
      <Stack align="center" gap="xs">
        <Time format={DateTime.DATETIME_FULL} fw={600}>
          {createdAt}
        </Time>
        {audio && (
          <Box component="audio" controls w="100%">
            <source src={audio.url} type={audio.contentType} />
          </Box>
        )}
        {transcription && (
          <Spoiler
            maxHeight={120}
            showLabel="Show more"
            hideLabel="Hide"
            styles={{
              control: {
                fontSize: "var(--mantine-font-size-sm)",
              },
            }}
          >
            <Text c="dimmed">{transcription}</Text>
          </Spoiler>
        )}
      </Stack>
    </Card>
  );
};

export default PensieveRecordingCard;
