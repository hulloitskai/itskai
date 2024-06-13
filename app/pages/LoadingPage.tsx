import type { PageComponent } from "~/helpers/inertia";
import type { SharedPageProps } from "~/types";
import { Loader, Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";

export interface LoadingPageProps extends SharedPageProps {
  timeout: number;
}

const LoadingPage: PageComponent<LoadingPageProps> = ({ timeout }) => {
  useEffect(() => {
    if (opener) {
      setTimeout(close, timeout);
    } else {
      location.href = "/";
    }
  }, [timeout]);
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

LoadingPage.layout = buildLayout<LoadingPageProps>(page => (
  <AppLayout title="Loading...">{page}</AppLayout>
));

export default LoadingPage;
