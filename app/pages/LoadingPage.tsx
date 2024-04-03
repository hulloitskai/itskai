import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Loader, Text } from "@mantine/core";

import type { LocatePageQuery } from "~/helpers/graphql";
import AppLayout from "~/components/AppLayout";
import { useTimeout } from "@mantine/hooks";

export type LoadingPageProps = PagePropsWithData<LocatePageQuery>;

const LoadingPage: PageComponent<LoadingPageProps> = () => {
  useTimeout(close, 4000, { autoInvoke: true });
  return (
    <Center style={{ flexGrow: 1 }}>
      <Card w="100%" maw={280} pt="lg" withBorder>
        <Stack align="center" gap="xs">
          <Loader size="sm" />
          <Text size="sm" c="dimmed">
            Loading... (pls be patient)
          </Text>
        </Stack>
      </Card>
    </Center>
  );
};

LoadingPage.layout = buildLayout<LoadingPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Loading..." {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default LoadingPage;
