import type { PageComponent } from "~/helpers/inertia";
import type {
  ICloudConnection,
  OAuthConnection,
  SharedPageProps,
} from "~/types";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import AdminICloudConnectionForm from "~/components/AdminICloudConnectionForm";
import AdminOAuthConnectionForm from "~/components/AdminOAuthConnectionForm";
import AdminLocationLogsSyncButton from "~/components/AdminLocationLogsSyncButton";
import AdminJournalEntriesSyncButton from "~/components/AdminJournalEntriesSyncButton";
import AdminLocationAccessGrants from "~/components/AdminLocationAccessGrants";

export interface AdminPageProps extends SharedPageProps {
  icloudConnection: ICloudConnection;
  googleConnection: OAuthConnection;
  spotifyConnection: OAuthConnection;
}

const AdminPage: PageComponent<AdminPageProps> = ({
  icloudConnection,
  googleConnection,
  spotifyConnection,
}) => {
  return (
    <Stack>
      <Card withBorder>
        <Stack gap="xs">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Data controls
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Sync data from your services
            </Text>
          </Stack>
          <Stack gap={6}>
            <AdminLocationLogsSyncButton />
            <AdminJournalEntriesSyncButton />
          </Stack>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="xs">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Location access grants
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Grant access to your precise location
            </Text>
          </Stack>
          <AdminLocationAccessGrants />
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="sm">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              iCloud
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Enables location services
            </Text>
          </Stack>
          <AdminICloudConnectionForm
            connection={icloudConnection}
            onDisconnected={() => {
              router.reload({ only: ["icloudConnection"] });
            }}
          />
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="sm">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Google
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Enables availability services
            </Text>
          </Stack>
          <AdminOAuthConnectionForm
            connection={googleConnection}
            onDisconnected={() => {
              router.reload({ only: ["googleConnection"] });
            }}
          />
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="sm">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Spotify
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Enables currently-playing & lyrics services
            </Text>
          </Stack>
          <AdminOAuthConnectionForm
            connection={spotifyConnection}
            onDisconnected={() => {
              router.reload({ only: ["spotifyConnection"] });
            }}
          />
        </Stack>
      </Card>
    </Stack>
  );
};

AdminPage.layout = buildLayout<AdminPageProps>(page => (
  <AppLayout
    title="Admin"
    breadcrumbs={[
      { title: "Home", href: "/" },
      { title: "Admin", href: "/admin" },
    ]}
    withContainer
    withGutter
    containerSize="xs"
  >
    {page}
  </AppLayout>
));

export default AdminPage;
