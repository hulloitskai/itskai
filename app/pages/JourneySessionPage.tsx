import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { RingProgress, Text } from "@mantine/core";

import {
  JourneySessionPageSubscriptionDocument,
  type JourneySessionPageQuery,
} from "~/helpers/graphql";

import JourneyAppLayout from "~/components/JourneyAppLayout";

import classes from "./JourneySessionPage.module.css";

export type JourneySessionPageProps =
  PagePropsWithData<JourneySessionPageQuery>;

const MAX_COUNTDOWN_SECONDS = 3600;

const JourneySessionPage: PageComponent<JourneySessionPageProps> = ({
  data: { session },
}) => {
  invariant(session, "Missing session");
  const { participations } = session;

  // == Routing
  const router = useRouter();

  // == Countdown
  const finishesAt = useMemo(() => {
    const startedAt = DateTime.fromISO(session.startedAt);
    return startedAt.plus({ hour: 1 });
  }, [session]);
  const countdownSecondsFromFinishesAt = useCallback(() => {
    const seconds = finishesAt.diffNow().as("seconds");
    return Math.max(seconds, 0);
  }, [finishesAt]);
  const [countdownSeconds, setCountdownSeconds] = useState(
    countdownSecondsFromFinishesAt,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownSeconds(countdownSecondsFromFinishesAt());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [countdownSecondsFromFinishesAt]);
  const countdownTime = useMemo(() => {
    if (countdownSeconds === 0) {
      return "Time's up!";
    }
    return Duration.fromObject({ seconds: countdownSeconds }).toFormat("mm:ss");
  }, [countdownSeconds]);

  // == Participation
  useSubscription(JourneySessionPageSubscriptionDocument, {
    onData: ({ data: { data } }) => {
      if (data) {
        router.reload({ preserveScroll: true });
      }
    },
    onError: error => {
      console.error(
        "Failed to subscribe to session participation updates",
        formatJSON({ error }),
      );
    },
  });

  return (
    <Stack align="center" my="xl">
      <Text>go go go!</Text>
      <RingProgress
        sections={[
          {
            color: "primary",
            value:
              (MAX_COUNTDOWN_SECONDS -
                countdownSeconds / MAX_COUNTDOWN_SECONDS) *
              100,
          },
        ]}
        label={
          <Center>
            <Text span fw={700}>
              {countdownTime}
            </Text>
          </Center>
        }
        size={240}
        thickness={7}
        roundCaps
      />
      <Container size="xs" w="100%">
        <Stack gap="xs">
          {participations.map(
            ({
              id: participationId,
              participantName,
              participantIsViewer,
              goal,
            }) => (
              <Tooltip
                key={participationId}
                label="You!"
                color="primary"
                c="var(--mantine-color-white)"
                withArrow
                position="right"
                opened={participantIsViewer}
              >
                <Card
                  withBorder
                  padding="sm"
                  className={classes.participationCard}
                  {...(participantIsViewer && {
                    "data-is-viewer": participantIsViewer,
                  })}
                >
                  <Stack gap={4}>
                    <Badge>{participantName}</Badge>
                    <Text size="sm" style={{ flexGrow: 1 }}>
                      {goal}
                    </Text>
                  </Stack>
                </Card>
              </Tooltip>
            ),
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

JourneySessionPage.layout = buildLayout<JourneySessionPageProps>(
  (page, { data: { viewer } }) => (
    <JourneyAppLayout padding={0} {...{ viewer }}>
      {page}
    </JourneyAppLayout>
  ),
);

export default JourneySessionPage;
