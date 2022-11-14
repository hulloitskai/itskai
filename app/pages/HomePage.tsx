import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import HomeContactLink from "~/components/HomeContactLink";

import ExclamationCircleIcon from "~icons/heroicons/exclamation-circle-20-solid";

const HomePage: PageComponent = () => {
  const theme = useMantineTheme();
  return (
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
      <Alert
        color="indigo"
        icon={<ExclamationCircleIcon />}
        title="I'm currently looking for work!"
        styles={({ spacing, colors }) => ({
          icon: {
            marginRight: spacing.xs,
          },
          title: {
            marginBottom: 0,
          },
          message: {
            color: colors.dark[3],
          },
        })}
      >
        My{" "}
        <Anchor href="/work" target="_blank" weight={500} color="indigo">
          portfolio
        </Anchor>{" "}
        is a work-in-progress, but in the meantime you can{" "}
        <Anchor href="/resume" weight={500} color="indigo">
          check out my resume
        </Anchor>{" "}
        :)
      </Alert>
      <Divider />
      <Container size="sm">
        <Stack spacing={8}>
          <Text color="dark.3">
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
              To make it easy for others to collaborate with me on the things I
              care about.
            </List.Item>
            <List.Item>
              To encourage others to interact with me and do fun things together
              with me in The Real World!
            </List.Item>
          </List>
          <Text color="dark.3">
            Is there something you wanted to chat with me about? Please reach
            out!
            <br />
            You can <HomeContactLink color="indigo" /> or{" "}
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
      </Container>
    </Stack>
  );
};

export default HomePage;
