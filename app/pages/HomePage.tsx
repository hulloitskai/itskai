import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import BellIcon from "~icons/heroicons/bell-20-solid";

import type { HomePageQuery } from "~/helpers/graphql";

import ContactMeLink from "~/components/ContactMeLink";
import HomePageJournalEntry from "~/components/HomePageJournalEntry";
import Pensieve from "~/components/Pensieve";
import LocationAlert from "~/components/LocationAlert";

export type HomePageProps = PagePropsWithData<HomePageQuery> & {
  readonly firstJournalEntryId: string;
  readonly autoscroll: boolean;
};

const HomePage: PageComponent<HomePageProps> = ({
  firstJournalEntryId,
  autoscroll,
  data: { announcement, journalEntry, location },
}) => {
  // == Pensieve
  const [showPensieve, setShowPensieve] = useState(false);

  // == Location
  const [showLocation, setShowLocation] = useState(!!location);

  return (
    <Stack spacing="xs">
      {announcement ? (
        <Alert icon={<BellIcon />} mt="md">
          {announcement}
        </Alert>
      ) : (
        <Space h="xs" />
      )}
      <Center h={275}>
        <Stack align="center">
          <Title color="white">Hi, it&apos;s Kai</Title>
          <Text color="gray.6" align="center" maw={400}>
            Welcome to my little corner of the internet :)
            <br />
            Please enjoy your stay. if you&apos;re having a good time,
            let&apos;s{" "}
            <Anchor
              href="http://cal.com/itskai"
              target="_blank"
              rel="noopener noreferrer nofollow"
              weight={600}
            >
              do something together
            </Anchor>
            !
          </Text>
          <Text align="center" size="xs" opacity={0.7} lh={1.2}>
            (and also feel free to{" "}
            <ContactMeLink>hit me up anytime</ContactMeLink> & tell me
            what&apos;s on your mind!)
          </Text>
        </Stack>
      </Center>
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
            <Stack align="center" spacing="xs">
              <Box sx={{ textAlign: "center" }}>
                <Title order={2} size="h3">
                  Sometimes, Kai thinks out loud.
                </Title>
                <Text size="xs" color="dimmed" lh={1.3}>
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
            <Space h="xl" />
          </Box>
        )}
      </Transition>
      <Stack align="center" spacing="xs">
        <Title order={2} size="h3">
          Sometimes, Kai writes.
        </Title>
        <HomePageJournalEntry
          firstEntryId={firstJournalEntryId}
          initialEntry={journalEntry}
          {...{ autoscroll }}
        />
      </Stack>
      <Space h="xs" />
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
          <LocationAlert
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
