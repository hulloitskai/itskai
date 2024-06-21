import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import TimelineActivitiesImportButton from "~/components/TimelineActivitiesImportButton";
import TimelinePhotosImportButton from "~/components/TimelinePhotosImportButton";
// import TimelinePhotoCreateWithTimestampButton from "~/components/TimelinePhotoCreateWithTimestampButton";

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
            {/* <TimelinePhotoCreateWithTimestampButton /> */}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

TimelineAdminPage.layout = buildLayout<TimelineAdminPageProps>(page => (
  <AppLayout
    title="Manage timeline"
    breadcrumbs={[
      { title: "Home", href: "/" },
      { title: "Timeline", href: "/timeline" },
      { title: "Admin", href: "/timeline/admin" },
    ]}
    withContainer
    withGutter
    containerSize="xs"
  >
    {page}
  </AppLayout>
));

export default TimelineAdminPage;
