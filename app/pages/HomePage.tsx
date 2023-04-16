import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { HomePageQuery } from "~/queries";

import HomePageWritings from "~/components/HomePageWritings";

export type HomePageProps = PageProps<HomePageQuery>;

const HomePage: PageComponent<HomePageProps> = () => {
  useEffect(() => {
    setVars("page", {
      pageName: HomePage.name,
    });
  }, []);
  return (
    <Stack spacing="xl">
      <MediaQuery
        largerThan="xs"
        styles={({ spacing }) => ({ height: spacing.xl })}
      >
        <Space h="sm" />
      </MediaQuery>
      <Center h={220}>
        <Stack spacing="xs" align="center">
          <Title color="white">hi, it&apos;s kai</Title>
          <Text color="gray.6" align="center" maw={400}>
            welcome to my little corner of the internet :)
            <br />
            please enjoy your stay. if you&apos;re having a good time,
            let&apos;s{" "}
            <Anchor
              href="http://cal.com/itskai"
              target="_blank"
              rel="noopener noreferrer nofollow"
              weight={500}
              color="indigo"
            >
              do something together!
            </Anchor>
          </Text>
        </Stack>
      </Center>
      <Stack align="center" spacing="lg" my="md">
        <Title order={2} size="h3">
          sometimes, kai writes
        </Title>
        <HomePageWritings />
      </Stack>
      <Space h="xl" />
    </Stack>
  );
};

HomePage.layout = buildLayout<HomePageProps>((page, { data: { viewer } }) => (
  <AppLayout withContainer withGutter {...{ viewer }}>
    {page}
  </AppLayout>
));

export default HomePage;
