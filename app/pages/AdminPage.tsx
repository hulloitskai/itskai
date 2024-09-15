import { Text } from "@mantine/core";

import AdminICloudConnectionForm from "~/components/AdminICloudConnectionForm";
import AdminLocationAccessGrants from "~/components/AdminLocationAccessGrants";
import AdminLocationLogsBackfillAddressesButtons from "~/components/AdminLocationLogsBackfillAddressesButtons";
import AdminLocationLogsSyncButton from "~/components/AdminLocationLogsSyncButton";
import AdminJournalEntriesSyncButton from "~/components/AdminNotionJournalEntriesSyncButton";
import AdminOAuthConnectionForm from "~/components/AdminOAuthConnectionForm";
import AppLayout from "~/components/AppLayout";
import { type ICloudConnection, type OAuthConnection } from "~/types";

export interface AdminPageProps extends SharedPageProps {
  icloudConnection: ICloudConnection;
  googleConnection: OAuthConnection;
  spotifyConnection: OAuthConnection;
  numLogsWithoutAddresses: number;
  newLocationAccessGrantId: string | null;
}

const AdminPage: PageComponent<AdminPageProps> = ({
  googleConnection,
  icloudConnection,
  newLocationAccessGrantId,
  numLogsWithoutAddresses,
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
            {numLogsWithoutAddresses > 0 && (
              <AdminLocationLogsBackfillAddressesButtons
                {...{ numLogsWithoutAddresses }}
              />
            )}
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
          <AdminLocationAccessGrants
            newGrantId={newLocationAccessGrantId ?? undefined}
          />
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
            onConnected={() => {
              router.reload({ only: ["icloudConnection"] });
            }}
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

AdminPage.layout = page => (
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
);

export default AdminPage;
