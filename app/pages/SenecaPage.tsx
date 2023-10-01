import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { DateTime } from "luxon";
import { format as formatTimeAgo } from "timeago.js";
import humanizeDuration from "humanize-duration";

import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

import type { SenecaPageQuery } from "~/helpers/graphql";
import type { SenecaPageMessageFragment } from "~/helpers/graphql";

import PageContainer from "~/components/PageContainer";
import { FC } from "react";

export type SenecaPageProps = PagePropsWithData<SenecaPageQuery> & {
  readonly whenWeMet: string;
};

const SenecaPage: PageComponent<SenecaPageProps> = ({
  whenWeMet,
  data: { messages },
}) => {
  // == Groupings
  const groups = useMemo(() => {
    const groups = [];
    let currentGroup: SenecaPageMessageFragment[] = [];
    let lastTimestamp: DateTime | null = null;
    messages.forEach(message => {
      const timestamp = DateTime.fromISO(message.timestamp);
      if (
        lastTimestamp &&
        Math.abs(timestamp.diff(lastTimestamp, "seconds").seconds) > 3 * 60
      ) {
        groups.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(message);
      lastTimestamp = timestamp;
    });
    if (lastTimestamp) {
      groups.push(currentGroup);
    }
    return groups;
  }, [messages]);

  return (
    <PageContainer size="xs" withGutter>
      <Stack gap="xl">
        <Text fw={500}>
          hi seneca
          <br />
          i&apos;ve known u for:
          <br />
          <TimeSinceWeMet span {...{ whenWeMet }} />
          <br />
          ty for everything
          <br />
          you mean so much to me.
          <br />
          <Text span c="pink.4">
            &lt;3
          </Text>
        </Text>
        {!isEmpty(groups) && (
          <>
            <Divider />
            <Stack gap="xs">
              <Box>
                <Title order={2} size="h3" mb={2}>
                  Sweet nothings
                </Title>
                <Text size="sm" c="dimmed">
                  Sometimes, I have sentiments to share with Seneca. I&apos;ll
                  write them here, so she can come back to read them whenever
                  she needs them most.
                </Text>
              </Box>
              <Stack gap="sm">
                {groups.map(messages => {
                  const firstMessage = first(messages);
                  invariant(
                    firstMessage,
                    "Group must have at least one message",
                  );
                  return (
                    <Box key={firstMessage.id}>
                      {messages.map(({ id, text, timestamp }) => (
                        <Group key={id} align="start" wrap="nowrap">
                          <Text lh={1.4} style={{ flexGrow: 1 }}>
                            {text}
                          </Text>
                          <Box style={{ flexShrink: 0 }}>
                            <Time
                              format={time => formatTimeAgo(time.toJSDate())}
                              size="xs"
                              c="dimmed"
                            >
                              {timestamp}
                            </Time>
                          </Box>
                        </Group>
                      ))}
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </PageContainer>
  );
};

type TimeSinceWeMetProps = Omit<TextProps, "children"> & {
  readonly whenWeMet: string;
};

const TimeSinceWeMet: FC<TimeSinceWeMetProps> = ({
  whenWeMet: whenWeMetISO,
  ...otherProps
}) => {
  const whenWeMet = useParseDateTime(whenWeMetISO);
  const [millisecondsSinceWeMet, setMillisecondsSinceWeMet] = useState(
    whenWeMet.diffNow().milliseconds,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setMillisecondsSinceWeMet(whenWeMet.diffNow().milliseconds);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Text c="pink.4" {...otherProps}>
      {humanizeDuration(millisecondsSinceWeMet, {
        largest: 5,
        round: true,
        conjunction: " and ",
      })}
    </Text>
  );
};

export default SenecaPage;
