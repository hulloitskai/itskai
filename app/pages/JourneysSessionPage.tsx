import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { ActionIcon, CopyButton, RingProgress, Text } from "@mantine/core";

import { JourneysSessionPageSubscriptionDocument } from "~/helpers/graphql";
import type { JourneysSessionPageQuery } from "~/helpers/graphql";

import JourneysAppLayout from "~/components/JourneysAppLayout";
import JourneysSessionParticipationForm from "~/components/JourneysSessionParticipationForm";

import classes from "./JourneysSessionPage.module.css";

export type JourneysSessionPageProps =
  PagePropsWithData<JourneysSessionPageQuery> & {
    readonly homepageUrl: string;
  };

const MAX_COUNTDOWN_SECONDS = 3600;

const JourneySessionPage: PageComponent<JourneysSessionPageProps> = ({
  homepageUrl,
  data: { session },
}) => {
  invariant(session, "Missing session");
  const { participations, viewerParticipation } = session;

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
  useSubscription(JourneysSessionPageSubscriptionDocument, {
    variables: {
      sessionId: session.id,
    },
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

  // == Sharing
  const sharingText = useMemo(() => {
    return (
      `heyo, i'm using ${homepageUrl} to be intentional about my time. ` +
      `if u join in the next couple of minutes, you can be a part of my ` +
      `session :)`
    );
  }, [homepageUrl]);

  return (
    <Stack align="center" my="xl" gap="xl">
      <Title order={3}>go go go! u got thisss</Title>
      <Container fluid w="100%">
        <Group
          justify="center"
          gap="lg"
          style={{ alignSelf: "stretch", rowGap: "var(--mantine-sizes-xs)" }}
        >
          <RingProgress
            sections={[
              {
                color: "primary",
                value:
                  (MAX_COUNTDOWN_SECONDS - countdownSeconds) /
                  (MAX_COUNTDOWN_SECONDS * 100),
              },
            ]}
            label={
              <Center>
                <Text span fw={700}>
                  {countdownTime}
                </Text>
              </Center>
            }
            size={200}
            thickness={7}
            roundCaps
            style={{ flexGrow: 0 }}
          />
          {viewerParticipation && (
            <JourneysSessionParticipationForm
              participationId={viewerParticipation.id}
              maw={508}
              miw={320}
              mb="xs"
              style={{ flexGrow: 1 }}
            />
          )}
        </Group>
      </Container>
      <Container size="xs" w="100%">
        <Stack gap="xs">
          {participations.map(
            ({ id: participationId, participantName, goal }) => {
              const isViewer = participationId === viewerParticipation?.id;
              return (
                <Box key={participationId} pos="relative">
                  <Card
                    withBorder
                    padding="sm"
                    className={classes.participationCard}
                    {...(isViewer && {
                      "data-is-viewer": isViewer,
                    })}
                  >
                    <Stack gap={4}>
                      <Badge style={{ textTransform: "none" }}>
                        {participantName}
                      </Badge>
                      <Text
                        size="sm"
                        style={{ flexGrow: 1, textTransform: "none" }}
                      >
                        {goal}
                      </Text>
                    </Stack>
                  </Card>
                  {isViewer && (
                    <Center pos="absolute" top={-7} left={0} right={0}>
                      <Badge variant="outline" bg="var(--mantine-color-white)">
                        You
                      </Badge>
                    </Center>
                  )}
                </Box>
              );
            },
          )}
        </Stack>
      </Container>
      <Container size="xs" w="100%">
        <Stack gap={8} fz="sm" c="dimmed">
          <Text inherit>
            Know someone who wants to be more intentional about how they spend
            their time? send them a text:
          </Text>
          <Box pos="relative" style={{ alignSelf: "stretch" }}>
            <Textarea
              value={sharingText}
              autosize
              readOnly
              styles={{
                input: {
                  paddingRight: rem(36),
                },
              }}
            />
            <Box pos="absolute" top={6} right={6}>
              <CopyButton value={sharingText}>
                {({ copy, copied }) => (
                  <Tooltip
                    label="Copied :)"
                    opened={copied}
                    color="primary"
                    c="var(--mantine-color-white)"
                    withArrow
                  >
                    <ActionIcon>
                      <ClipboardIcon onClick={copy} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

JourneySessionPage.layout = buildLayout<JourneysSessionPageProps>(
  (page, { data: { viewer } }) => (
    <JourneysAppLayout padding={0} {...{ viewer }}>
      {page}
    </JourneysAppLayout>
  ),
);

export default JourneySessionPage;
