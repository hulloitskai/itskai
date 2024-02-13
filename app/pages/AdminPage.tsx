import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { AdminPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import ICloudConnectionForm from "~/components/ICloudConnectionForm";
import GoogleConnectionForm from "~/components/GoogleConnectionForm";
import SpotifyConnectionForm from "~/components/SpotifyConnectionForm";
import LocationLogsSyncButton from "~/components/LocationLogsSyncButton";
import JournalEntriesSyncButton from "~/components/JournalEntriesSyncButton";
import LocationAccessGrants from "~/components/LocationAccessGrants";

export type AdminPageProps = PagePropsWithData<AdminPageQuery>;

const AdminPage: PageComponent<AdminPageProps> = ({
  data: { icloudConnection, googleConnection, spotifyConnection },
}) => {
  // == Routing
  const router = useRouter();

  return (
    <Stack>
      <Card withBorder>
        <Stack gap="xs">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Data Controls
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Sync data from your services
            </Text>
          </Stack>
          <Stack gap={6}>
            <LocationLogsSyncButton />
            <JournalEntriesSyncButton />
          </Stack>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="xs">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Location Access Grants
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Grant access to your precise location
            </Text>
          </Stack>
          <LocationAccessGrants />
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
          <ICloudConnectionForm
            connection={icloudConnection}
            onCreate={() => {
              router.reload({ preserveScroll: true });
            }}
            onDelete={() => {
              router.reload({ preserveScroll: true });
            }}
            onVerifySecurityCode={() => {
              router.reload({ preserveScroll: true });
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
          <GoogleConnectionForm
            connection={googleConnection}
            onDelete={() => {
              router.reload({ preserveScroll: true });
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
          <SpotifyConnectionForm
            connection={spotifyConnection}
            onDelete={() => {
              router.reload({ preserveScroll: true });
            }}
          />
        </Stack>
      </Card>
    </Stack>
  );
};

AdminPage.layout = buildLayout<AdminPageProps>((page, { data: { viewer } }) => (
  <AppLayout
    title="Admin"
    breadcrumbs={[
      { title: "Home", href: "/" },
      { title: "Admin", href: "/admin" },
    ]}
    withContainer
    withGutter
    containerSize="xs"
    {...{ viewer }}
  >
    {page}
  </AppLayout>
));

export default AdminPage;
