import type {
  ApproximateLocation,
  Exploration,
  NotionJournalEntry,
} from "~/types";
import { Text } from "@mantine/core";
import BellIcon from "~icons/heroicons/bell-20-solid";

import AppLayout from "~/components/AppLayout";
import ContactMeLink from "~/components/ContactMeLink";
import HomePageJournalEntry from "~/components/HomePageJournalEntry";
import ApproximateLocationAlert from "~/components/ApproximateLocationAlert";
import ExplorationBadge from "~/components/ExplorationBadge";

import classes from "./HomePage.module.css";

export interface HomePageProps extends SharedPageProps {
  announcement: string | null;
  explorations: Exploration[];
  journalEntry: NotionJournalEntry | null;
  firstJournalEntryId: string | null;
  journalAutoscroll: boolean;
  approximateLocation: ApproximateLocation | null;
}

const HomePage: PageComponent<HomePageProps> = ({
  announcement,
  explorations,
  journalEntry,
  firstJournalEntryId,
  journalAutoscroll,
  approximateLocation,
}) => {
  // const [showPensieve, setShowPensieve] = useState(false);
  const [showLocation, setShowLocation] = useState(!!approximateLocation);

  return (
    <Stack gap={52}>
      <Box pb="lg">
        {!!announcement && <Alert icon={<BellIcon />}>{announcement}</Alert>}
      </Box>
      <Stack align="center">
        <Title fw={900} fz={rem(44)} className={classes.headline}>
          Hi, it&apos;s Kai
        </Title>
        <Text maw={400} className={classes.subheadline}>
          Welcome to my little corner of the internet :)
          <br />
          Please enjoy your stay. if you&apos;re having a good time, let&apos;s{" "}
          <Anchor
            href="/hangout"
            target="_blank"
            rel="noopener noreferrer nofollow"
            fw={600}
          >
            do something together
          </Anchor>
          !
        </Text>
        <Text size="xs" opacity={0.8} lh={1.2} className={classes.subheadline}>
          (and also feel free to{" "}
          <ContactMeLink>hit me up anytime</ContactMeLink>
          <br />& tell me what&apos;s on your mind!)
        </Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Title order={2} size="h3">
          Some things I&apos;ve been exploring lately:
        </Title>
        <Group justify="center" gap={8} maw={760}>
          {explorations.map(exploration => (
            <ExplorationBadge key={exploration.id} exploration={exploration} />
          ))}
        </Group>
        <Text
          inherit
          fz="var(--mantine-font-size-sm)"
          opacity={0.8}
          className={classes.explorationsCallout}
        >
          Do any of these resonate with you?{" "}
          <Anchor
            inherit
            href="/walk"
            target="_blank"
            rel="noopener noreferrer nofollow"
            fw={500}
          >
            Let&apos;s go for a walk and talk about it :)
          </Anchor>
        </Text>
      </Stack>
      {/* <Transition
        transition={{
          transitionProperty: "transform, opacity, max-height",
          common: { transformOrigin: "top" },
          out: { opacity: 0, transform: "scale(0)", maxHeight: 0 },
          in: { opacity: 1, transform: "scale(1)", maxHeight: 500 },
        }}
        duration={400}
        mounted={showPensieve}
        keepMounted
      >
        {style => (
          <Stack align="center" gap="xs" {...{ style }}>
            <Box style={{ textAlign: "center" }}>
              <Title order={2} size="h3">
                Sometimes, Kai thinks out loud.
              </Title>
              <Text size="xs" c="dimmed" lh={1.3}>
                (messages from the last 12 hours)
              </Text>
            </Box>
            <Pensieve
              expandable
              h={400}
              onLoadMessages={messages => {
                if (!isEmpty(messages)) {
                  setShowPensieve(true);
                }
              }}
              onNewMessage={() => {
                setShowPensieve(true);
              }}
            />
          </Stack>
        )}
      </Transition> */}
      {journalEntry && !!firstJournalEntryId && (
        <Stack align="center" gap="xs">
          <Title order={2} size="h3">
            Sometimes, Kai writes.
          </Title>
          <HomePageJournalEntry
            entry={journalEntry}
            firstEntryId={firstJournalEntryId}
            autoscroll={journalAutoscroll}
            style={{ alignSelf: "stretch" }}
          />
        </Stack>
      )}
      <Transition
        transition={{
          transitionProperty: "transform, opacity, max-height",
          common: { transformOrigin: "top" },
          out: { opacity: 0, transform: "scale(0)", maxHeight: 0 },
          in: { opacity: 1, transform: "scale(1)", maxHeight: 140 },
        }}
        duration={320}
        mounted={showLocation}
        keepMounted
      >
        {style => (
          <ApproximateLocationAlert
            initialLocation={approximateLocation}
            onUpdate={location => {
              setShowLocation(!!location);
            }}
            my="xl"
            w="100%"
            maw={540}
            {...{ style }}
          />
        )}
      </Transition>
    </Stack>
  );
};

HomePage.layout = buildLayout<HomePageProps>(
  (page, { journalEntry, journalAutoscroll }) => (
    <>
      <AppLayout
        withContainer
        withGutter
        {...(journalEntry &&
          journalAutoscroll && {
            title: journalEntry.title,
          })}
      >
        <Head>
          <link
            rel="alternate"
            type="application/atom+xml"
            href="/feed.atom"
            title="Atom Feed"
          />
        </Head>
        {page}
      </AppLayout>
    </>
  ),
);

export default HomePage;
