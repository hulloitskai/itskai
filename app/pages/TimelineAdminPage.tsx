import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { TimelineAdminPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import TimelineAdminGoogleLocationHistoryImportButton from "~/components/TimelineAdminGoogleLocationHistoryImportButton";
import TimelineAdminPhotosImportButton from "~/components/TimelineAdminPhotosImportButton";

export type TimelineAdminPageProps =
  PagePropsWithData<TimelineAdminPageQuery> & {
    readonly googleLocationHistoryUploadUrl: string;
    readonly photosUploadUrl: string;
  };

const TimelineAdminPage: PageComponent<TimelineAdminPageProps> = ({
  googleLocationHistoryUploadUrl,
  photosUploadUrl,
}) => {
  return (
    <Stack>
      <Card withBorder>
        <Stack gap="xs">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Import Controls
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Import Google timeline history and timeline photos.
            </Text>
          </Stack>
          <Stack gap={6}>
            <TimelineAdminGoogleLocationHistoryImportButton
              uploadUrl={googleLocationHistoryUploadUrl}
            />
            <TimelineAdminPhotosImportButton uploadUrl={photosUploadUrl} />
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

TimelineAdminPage.layout = buildLayout<TimelineAdminPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Timeline Admin"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Timeline", href: "/timeline" },
        { title: "Admin", href: "/timeline/admin" },
      ]}
      withContainer
      withGutter
      containerSize="xs"
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default TimelineAdminPage;
