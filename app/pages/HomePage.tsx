import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import HomePageContactLink from "~/components/HomePageContactLink";
import HomePageGraph from "~/components/HomePageGraph";

import type { HomePageQuery } from "~/queries";

export type HomePageProps = {
  readonly data: HomePageQuery;
};

const HomePage: PageComponent = () => {
  const theme = useMantineTheme();
  return (
    <>
      <Container size="sm">
        <Stack spacing="xl">
          <MediaQuery largerThan="xs" styles={{ height: theme.spacing.xl }}>
            <Space h="sm" />
          </MediaQuery>
          <Stack spacing={0} align="center">
            <Title size={48}>Hullo!</Title>
            <Text color="dark.3" sx={{ alignSelf: "center" }}>
              I&apos;m{" "}
              <Text color="dark" weight={600} span>
                Kai
              </Text>
              ! Welcome to my little corner of the internet :)
            </Text>
          </Stack>
          <Divider sx={({ colors }) => ({ borderColor: colors.gray[3] })} />
          <Stack spacing={8}>
            <Text color="gray.6">
              This website is still very much in construction! And so here are
              some design goals I am keeping in mind as I build it:
            </Text>
            <List
              ml="md"
              mr="lg"
              styles={({ colors, fn }) => ({
                item: {
                  color: colors.dark[fn.primaryShade()],
                  fontWeight: 500,
                },
              })}
            >
              <List.Item>
                To create a space where I can share my thoughts, feelings, and
                ideas.
              </List.Item>
              <List.Item>
                To make it easy for others to collaborate with me on the things
                I care about.
              </List.Item>
              <List.Item>
                To encourage others to interact with me and do fun things
                together with me in The Real World!
              </List.Item>
            </List>
            <Text color="gray.6">
              Is there something you wanted to chat with me about? Please reach
              out!
              <br />
              You can <HomePageContactLink color="indigo" /> or{" "}
              <Anchor
                href="http://calendly.com/hulloitskai/hangout"
                target="_blank"
                rel="noopener noreferrer nofollow"
                weight={500}
                color="indigo"
              >
                schedule a hangout with me
              </Anchor>{" "}
              :)
            </Text>
          </Stack>
          <Divider sx={({ colors }) => ({ borderColor: colors.gray[3] })} />
          <Box>
            <Title order={2} size="h3">
              Recent Perusings
            </Title>
            <Text color="gray.6">
              This is a graph of the things that I have been thinking (and
              writing) about this past week.
            </Text>
          </Box>
        </Stack>
      </Container>
      <HomePageGraph w="full" sx={{ flex: 1 }} />
    </>
  );
};

HomePage.layout = layoutWithData<HomePageProps>((page, { viewer }) => (
  <AppLayout {...{ viewer }} withContainer={false} padding={0}>
    {page}
  </AppLayout>
));

export default HomePage;
