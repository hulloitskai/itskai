import type { FC } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { DateTime } from "luxon";
import humanizeDuration from "humanize-duration";

import type { TextProps } from "@mantine/core";
import { Text } from "@mantine/core";

import PageContainer from "~/components/PageContainer";
import PageLayout from "~/components/PageLayout";
import SenecaMoodRating from "~/components/SenecaMoodRating";

import { SenecaPageMessageSubscriptionDocument } from "~/helpers/graphql";
import type { SenecaPageQuery } from "~/helpers/graphql";
import type { SenecaPageMessageFragment } from "~/helpers/graphql";

import "~/components/AppLayout.css";

export type SenecaPageProps = PagePropsWithData<SenecaPageQuery> & {
  readonly whenWeMet: string;
};

const SenecaPage: PageComponent<SenecaPageProps> = ({
  whenWeMet,
  data: { messages },
}) => {
  // == Routing
  const router = useRouter();

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

  // == Message Subscription
  useSubscription(SenecaPageMessageSubscriptionDocument, {
    variables: {},
    onData: ({ data: { data, error } }) => {
      if (data) {
        const { message } = data;
        if (message) {
          router.reload({ preserveState: true });
        }
      } else if (error) {
        console.error("Error during message update", formatJSON({ error }));
      }
    },
    onError: error => {
      console.error(
        "Failed to subscribe to message updates",
        formatJSON({ error }),
      );
    },
  });

  return (
    <PageContainer size="sm" withGutter>
      <Stack gap="xl">
        <Text>
          Hi Seneca
          <br />
          I&apos;ve known u for <TimeSinceWeMet span {...{ whenWeMet }} />
          <br />
          Ty for everything
          <br />
          You mean so much to me.
          <br />
          <Text span c="pink.4">
            &lt;3
          </Text>
        </Text>
        <Divider />
        <Stack gap="xs">
          <Box>
            <Title order={2} size="h3" mb={2}>
              Vibe check
            </Title>
            <Text>Thanks for stopping by today. How are u feeling?</Text>
          </Box>
          <SenecaMoodRating />
        </Stack>
        {!isEmpty(groups) && (
          <>
            <Divider />
            <Stack gap="xs">
              <Box>
                <Title order={2} size="h3" mb={2}>
                  Gentle reminders
                </Title>
                <Text size="sm" c="dimmed" lh={1.3}>
                  Sometimes, I have sentiments to share with Seneca.
                  <br />
                  I&apos;ll write them here, so she can come back to read them
                  whenever she needs them most.
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
                    <Stack key={firstMessage.id} gap={4}>
                      {messages.map(({ id, text, timestamp }) => (
                        <Group key={id} align="start" wrap="nowrap">
                          <Text
                            size="sm"
                            display="block"
                            lh={1.4}
                            style={({ fontFamilyMonospace }) => ({
                              flexGrow: 1,
                              fontFamily: fontFamilyMonospace,
                              textTransform: "none",
                            })}
                          >
                            {text}
                          </Text>
                          <Box style={{ flexShrink: 0 }}>
                            <TimeAgo size="xs" c="dimmed">
                              {timestamp}
                            </TimeAgo>
                          </Box>
                        </Group>
                      ))}
                    </Stack>
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

SenecaPage.layout = page => (
  <PageLayout>
    <Head>
      <title>hi seneca</title>
      <meta name="robots" content="noindex" />
    </Head>
    {page}
  </PageLayout>
);

export default SenecaPage;

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
