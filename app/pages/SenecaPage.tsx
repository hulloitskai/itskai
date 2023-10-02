import type { FC } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { DateTime } from "luxon";
import { format as formatTimeAgo } from "timeago.js";
import humanizeDuration from "humanize-duration";

import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";

import { SenecaPageMessageSubscriptionDocument } from "~/helpers/graphql";
import type {
  SenecaPageQuery,
  SenecaPageMessageFragment,
} from "~/helpers/graphql";

import PageContainer from "~/components/PageContainer";
import PageLayout from "~/components/PageLayout";
import SenecaMoodRating from "~/components/SenecaMoodRating";

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
    onData: ({ data: { data } }) => {
      if (data) {
        const { message } = data;
        if (message) {
          router.reload({ preserveScroll: true });
        }
      }
    },
    onError: error => {
      console.error("Error during message update", formatJSON({ error }));
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
            xoxo &lt;3 xoxo
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
