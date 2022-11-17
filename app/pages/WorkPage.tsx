import type { PageComponent } from "~/helpers/inertia";
import { Highlight, Text } from "@mantine/core";

import ResumeButton from "~/components/ResumeButton";
import WorkContactButton from "~/components/WorkContactButton";

import WrenchScrewdriverIcon from "~icons/heroicons/wrench-screwdriver-20-solid";
import GithubIcon from "~icons/feather/github";

import type { WorkPageQuery } from "~/queries";

type WorkPageProps = {
  readonly data: WorkPageQuery;
};

const WorkPage: PageComponent<WorkPageProps> = () => (
  <Stack spacing="xl">
    <Stack>
      <PageHeader
        title="Let's build something beautiful, together."
        description={
          "I'm currently exploring new directions in work and life. Here are " +
          "some things I care about, some things I'm proud of doing, and " +
          "some ways that we can work together!"
        }
        small
      />
      <Group spacing="xs" grow>
        <ResumeButton />
        <WorkContactButton />
      </Group>
    </Stack>
    <Divider />
    <Box>
      <Title order={2} size="h3">
        Projects
      </Title>
      <Stack spacing="xs" mt={6}>
        <Card p="lg" radius="md" withBorder>
          <Group position="apart" spacing="xs">
            <Text weight={600}>This Website!</Text>
            <Button
              component="a"
              href="https://github.com/hulloitskai/itskai.me"
              target="_blank"
              rel="noopener noreferrer nofollow"
              variant="outline"
              leftIcon={<GithubIcon />}
              size="xs"
              compact
              styles={{
                root: { position: "relative", bottom: 2 },
                leftIcon: {
                  marginRight: 6,
                },
              }}
            >
              github.com/hulloitskai/itskai.me
            </Button>
          </Group>
          <Text size="sm" color="dark.3" mt={4}>
            <Highlight
              highlight={["Ruby on Rails", "React"]}
              highlightStyles={({ colors }) => ({
                color: colors.dark[4],
                backgroundColor: "inherit",
                fontWeight: 500,
              })}
            >
              A personal website built with Ruby on Rails and React! Featuring:
            </Highlight>
          </Text>
          <List
            ml="md"
            mr="lg"
            styles={({ colors, fontSizes }) => ({
              item: { color: colors.dark[3], fontSize: fontSizes.sm },
            })}
          >
            <List.Item>
              Server-rendered components (look ma, no loading skeletons!)
            </List.Item>
            <List.Item>Responsive, mobile-friendly pages</List.Item>
            <List.Item>Un-scrapable mailto links ;)</List.Item>
            <List.Item>
              <Anchor href="/api" target="_blank" weight={500} color="indigo">
                A GraphQL API
              </Anchor>
            </List.Item>
            <List.Item>
              <Anchor
                href="/api/status"
                target="_blank"
                weight={500}
                color="indigo"
              >
                Health checks
              </Anchor>
            </List.Item>
            <List.Item>
              <Anchor
                href="https://github.com/hulloitskai/itskai.me/actions"
                target="_blank"
                rel="noopener noreferrer nofollow"
                weight={500}
                color="indigo"
              >
                Continuous integration & deployment (GitHub Actions & Fly.io)
              </Anchor>
            </List.Item>
          </List>
        </Card>
        <Card
          p="lg"
          radius="md"
          withBorder
          sx={({ colors }) => ({
            backgroundColor: colors.gray[1],
          })}
        >
          <Center sx={{ height: 80 }}>
            <Group
              spacing="xs"
              sx={({ colors }) => ({
                color: colors.dark[3],
              })}
            >
              <WrenchScrewdriverIcon />
              <Text size="sm" weight={500}>
                More content coming soon!
              </Text>
            </Group>
          </Center>
        </Card>
      </Stack>
    </Box>
  </Stack>
);

WorkPage.layout = layoutWithData<WorkPageProps>((page, { viewer }) => (
  <AppLayout {...{ viewer }}>{page}</AppLayout>
));

export default WorkPage;
