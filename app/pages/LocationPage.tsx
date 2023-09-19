import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { LocationPageQuery } from "~/helpers/graphql";

export type LocationPageProps = PagePropsWithData<LocationPageQuery>;

const LocationPage: PageComponent<LocationPageProps> = () => {
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
    </Stack>
  );
};

LocationPage.layout = buildLayout<LocationPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Location"
      description="The ultimate Kai-stalking toolkit."
      withContainer
      containerProps={{ sx: { flexGrow: 1 } }}
      withGutter
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default LocationPage;
