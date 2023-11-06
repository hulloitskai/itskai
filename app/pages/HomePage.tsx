import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import BellIcon from "~icons/heroicons/bell-20-solid";

import type { HomePageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import ContactMeLink from "~/components/ContactMeLink";
import HomePageJournalEntry from "~/components/HomePageJournalEntry";
import LocatePageAlert from "~/components/LocationAlert";
import Pensieve from "~/components/Pensieve";
import ExplorationBadge from "~/components/ExplorationBadge";

export type HomePageProps = PagePropsWithData<HomePageQuery> & {
  readonly firstJournalEntryId: string;
  readonly autoscroll: boolean;
};

const HomePage: PageComponent<HomePageProps> = ({
  firstJournalEntryId,
  autoscroll,
  data: { announcement, explorations, journalEntry, location },
}) => {
  const [showPensieve, setShowPensieve] = useState(false);
  const [showLocation, setShowLocation] = useState(!!location);

  return (
    <Stack gap={52}>
      <Box pb="lg">
        {!!announcement && <Alert icon={<BellIcon />}>{announcement}</Alert>}
      </Box>
      <Stack align="center">
        <Title c="var(--mantine-color-white)" fw={900} fz={rem(44)}>
          Hi, it&apos;s Kai
        </Title>
        <Text c="gray.6" maw={400} style={{ textAlign: "center" }}>
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
        <Text size="xs" opacity={0.7} lh={1.2} style={{ textAlign: "center" }}>
          (and also feel free to{" "}
          <ContactMeLink>hit me up anytime</ContactMeLink>
          <br />& tell me what&apos;s on your mind!)
        </Text>
      </Stack>
      <Transition
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
          <Box {...{ style }}>
            <Stack align="center" gap="xs">
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
          </Box>
        )}
      </Transition>
      <Stack align="center" gap="xs">
        <Title order={2} size="h3">
          Some things I&apos;ve been exploring lately:
        </Title>
        <Group justify="center" gap={8} maw={760}>
          {explorations.map((exploration, index) => (
            <ExplorationBadge key={index}>{exploration}</ExplorationBadge>
          ))}
        </Group>
        <Text inherit fz="var(--mantine-font-size-sm)" opacity={0.7}>
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
      <Stack align="center" gap="xs">
        <Title order={2} size="h3">
          Sometimes, Kai writes.
        </Title>
        <HomePageJournalEntry
          firstEntryId={firstJournalEntryId}
          initialEntry={journalEntry}
          style={{ alignSelf: "stretch" }}
          {...{ autoscroll }}
        />
      </Stack>
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
          <LocatePageAlert
            initialLocation={location}
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

HomePage.layout = buildLayout<HomePageProps>((page, { data: { viewer } }) => (
  <AppLayout withContainer withGutter {...{ viewer }}>
    {page}
  </AppLayout>
));

export default HomePage;
