import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import TimelineActivitiesImportButton from "~/components/TimelineActivitiesImportButton";
import TimelinePhotoCreateWithTimestampButton from "~/components/TimelinePhotoCreateWithTimestampButton";
import TimelinePhotosImportButton from "~/components/TimelinePhotosImportButton";

export interface TimelineAdminPageProps extends SharedPageProps {}

const TimelineAdminPage: PageComponent<TimelineAdminPageProps> = () => {
  return (
    <Stack>
      <Card withBorder>
        <Stack gap="xs">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Import controls
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Import Google timeline history and timeline photos.
            </Text>
          </Stack>
          <Stack gap={6}>
            <TimelineActivitiesImportButton />
            <TimelinePhotosImportButton />
            <TimelinePhotoCreateWithTimestampButton />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

TimelineAdminPage.layout = page => (
  <AppLayout
    title="Manage timeline"
    breadcrumbs={[
      { title: "Home", href: routes.home.show.path() },
      // { title: "Timeline", href: routes.timeline.show.path() },
      // { title: "Admin", href: routes.timelineAdmin.show.path() },
    ]}
    withContainer
    withGutter
    containerSize="xs"
  >
    {page}
  </AppLayout>
);

export default TimelineAdminPage;
