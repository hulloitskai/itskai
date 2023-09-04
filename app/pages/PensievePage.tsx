import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { PensievePageQuery } from "~/helpers/graphql";
import { Text } from "@mantine/core";

import Pensieve from "~/components/Pensieve";

export type PensievePageProps = PagePropsWithData<PensievePageQuery>;

const PensievePage: PageComponent<PensievePageProps> = () => {
  // == Auto Scroll
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
    <Stack align="center" spacing="xs" sx={{ flexGrow: 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <Title order={2} size="h3">
          Sometimes, Kai thinks out loud.
        </Title>
        <Text size="xs" color="dimmed" lh={1.3}>
          (messages from the last 12 hours)
        </Text>
      </Box>{" "}
      <Pensieve
        sx={{ flexGrow: 1 }}
        onLoadMessages={() => {
          autoScroll(300);
        }}
        onNewMessage={() => {
          autoScroll();
        }}
      />
    </Stack>
  );
};

PensievePage.layout = buildLayout<PensievePageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Pensieve"
      description="Sometimes, Kai thinks out loud."
      imageUrl="/pensieve-banner.png"
      withContainer
      containerProps={{ sx: { flexGrow: 1 } }}
      withGutter
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default PensievePage;
