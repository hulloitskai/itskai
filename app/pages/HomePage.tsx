import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { format as formatTimeAgo } from "timeago.js";
import { Text } from "@mantine/core";

import BellIcon from "~icons/heroicons/bell-20-solid";
import LocationIcon from "~icons/heroicons/map-pin-20-solid";

import type { HomePageQuery } from "~/helpers/graphql";

import ContactMeLink from "~/components/ContactMeLink";
import HomePageJournalEntry from "~/components/HomePageJournalEntry";
import Pensieve from "~/components/Pensieve";

export type HomePageProps = PagePropsWithData<HomePageQuery> & {
  readonly firstJournalEntryId: string;
  readonly autoscroll: boolean;
};

const HomePage: PageComponent<HomePageProps> = ({
  firstJournalEntryId,
  autoscroll,
  data: { announcement, journalEntry, location },
}) => {
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
            Wlease enjoy your stay. if you&apos;re having a good time,
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
      <Stack align="center" spacing="xs">
        <Box sx={{ textAlign: "center" }}>
          <Title order={2} size="h3">
            Sometimes, Kai thinks out loud.
          </Title>
          <Text size="xs" color="dimmed" lh={1.3}>
            (messages from the last 12 hours)
          </Text>
        </Box>
        <Pensieve expandable h={400} />
      </Stack>
      <Space h="xl" />
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
      {location &&
        resolve(() => {
          const { approximateAddress, googleMapsAreaUrl, timestamp } = location;
          return (
            <Alert
              icon={<LocationIcon />}
              title="In the area?"
              radius="md"
              my="xl"
              maw={540}
              pb={8}
              styles={{
                root: {
                  alignSelf: "center",
                },
                title: {
                  marginBottom: rem(2),
                },
              }}
            >
              <Stack spacing={4}>
                <Text>
                  I&apos;m currently around{" "}
                  <Anchor
                    href={googleMapsAreaUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    span
                    weight={600}
                  >
                    {approximateAddress}
                  </Anchor>
                  . If you&apos;re nearby, text me and come say hi!
                </Text>
                <Text size="xs" color="dimmed">
                  From Find My iPhone,{" "}
                  <Time inherit format={time => formatTimeAgo(time.toJSDate())}>
                    {timestamp}
                  </Time>
                  .
                </Text>
              </Stack>
            </Alert>
          );
        })}
    </Stack>
  );
};

HomePage.layout = buildLayout<HomePageProps>((page, { data: { viewer } }) => (
  <AppLayout withContainer withGutter {...{ viewer }}>
    {page}
  </AppLayout>
));

export default HomePage;
