import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import Pensieve from "~/components/Pensieve";

export interface PensievePageProps extends SharedPageProps {}

const PensievePage: PageComponent<PensievePageProps> = () => {
  // == Autoscroll
  const autoScroll = useCallback((timeout = 200) => {
    setTimeout(() => {
      const viewportEl = document.body;
      if (viewportEl.scrollHeight > innerHeight) {
        scrollTo({
          top: viewportEl.scrollHeight,
          behavior: "smooth",
        });
      }
    }, timeout);
  }, []);

  return (
    <Stack align="center" gap="xs" style={{ flexGrow: 1 }}>
      <Box style={{ textAlign: "center" }}>
        <Title order={2} size="h3">
          Sometimes, Kai thinks out loud.
        </Title>
        <Text size="xs" c="dimmed" lh={1.3}>
          (messages from the last 12 hours)
        </Text>
      </Box>
      <Pensieve
        onLoadMessages={() => {
          autoScroll(300);
        }}
        onNewMessage={() => {
          autoScroll();
        }}
        style={{ flexGrow: 1 }}
      />
    </Stack>
  );
};

PensievePage.layout = page => (
  <AppLayout
    title="Pensieve"
    description="Sometimes, Kai thinks out loud."
    imageUrl="/pensieve-banner.png"
    breadcrumbs={[
      { title: "Home", href: "/" },
      { title: "Pensieve", href: "/pensieve" },
    ]}
    withContainer
    containerProps={{
      style: { flexGrow: 1, display: "flex", flexDirection: "column" },
    }}
    withGutter
  >
    {page}
  </AppLayout>
);

export default PensievePage;
