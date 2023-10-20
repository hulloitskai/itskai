import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { AdminPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import ICloudCredentialsForm from "~/components/ICloudCredentialsForm";
import InstagramCredentialsForm from "~/components/InstagramCredentialsForm";
import GoogleCredentialsForm from "~/components/GoogleCredentialsForm";
import SpotifyCredentialsForm from "~/components/SpotifyCredentialsForm";
import LocationLogsImportButton from "~/components/LocationLogsImportButton";
import JournalEntriesImportButton from "~/components/JournalEntriesImportButton";
import LocationAccessGrants from "~/components/LocationAccessGrants";

export type AdminPageProps = PagePropsWithData<AdminPageQuery>;

const AdminPage: PageComponent<AdminPageProps> = ({
  data: {
    icloudCredentials,
    instagramCredentials,
    googleCredentials,
    spotifyCredentials,
  },
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
              Import data from your services
            </Text>
          </Stack>
          <Stack gap={6}>
            <LocationLogsImportButton />
            <JournalEntriesImportButton />
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
              Enables location services & obsidian note imports
            </Text>
          </Stack>
          <ICloudCredentialsForm
            credentials={icloudCredentials}
            onUpdate={() => {
              router.reload({ preserveScroll: true });
            }}
            onRemove={() => {
              router.reload({ preserveScroll: true });
            }}
          />
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="sm">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Instagram
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Enables automatic note updates
            </Text>
          </Stack>
          <InstagramCredentialsForm
            credentials={instagramCredentials}
            onUpdate={() => {
              router.reload({ preserveScroll: true });
            }}
            onRemove={() => {
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
          <GoogleCredentialsForm
            credentials={googleCredentials}
            onRemove={() => {
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
          <SpotifyCredentialsForm
            credentials={spotifyCredentials}
            onRemove={() => {
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
