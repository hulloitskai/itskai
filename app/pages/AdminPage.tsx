import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { AdminPageQuery } from "~/helpers/graphql";

import ICloudCredentialsForm from "~/components/ICloudCredentialsForm";
import InstagramCredentialsForm from "~/components/InstagramCredentialsForm";
import GoogleCredentialsForm from "~/components/GoogleCredentialsForm";
import SpotifyCredentialsForm from "~/components/SpotifyCredentialsForm";
import LocationLogsImportButton from "~/components/LocationLogsImportButton";
import JournalEntriesImportButton from "~/components/JournalEntriesImportButton";

export type AdminPageProps = PagePropsWithData<AdminPageQuery>;

const AdminPage: PageComponent<AdminPageProps> = ({
  data: {
    icloudCredentials,
    instagramCredentials,
    googleCredentials,
    spotifyCredentials,
  },
}) => (
  <Stack>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            Sync Actions
          </Title>
          <Text size="sm" color="dimmed" lh={1.3}>
            Manually sync data from your services.
          </Text>
        </Stack>
        <Stack spacing={6}>
          <LocationLogsImportButton />
          <JournalEntriesImportButton />
        </Stack>
      </Stack>
    </Card>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            iCloud
          </Title>
          <Text size="sm" color="dimmed" lh={1.3}>
            Authenticate with iCloud to enable location services.
          </Text>
        </Stack>
        <ICloudCredentialsForm credentials={icloudCredentials} />
      </Stack>
    </Card>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            Instagram
          </Title>
          <Text size="sm" color="dimmed" lh={1.3}>
            Authenticate with Instagram to enable note updates.
          </Text>
        </Stack>
        <InstagramCredentialsForm credentials={instagramCredentials} />
      </Stack>
    </Card>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            Google
          </Title>
          <Text size="sm" color="dimmed" lh={1.3}>
            Authenticate with Google to enable calendar availability services.
          </Text>
        </Stack>
        <GoogleCredentialsForm credentials={googleCredentials} />
      </Stack>
    </Card>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            Spotify
          </Title>
          <Text size="sm" color="dimmed" lh={1.3}>
            Authenticate with Spotify to enable music services.
          </Text>
        </Stack>
        <SpotifyCredentialsForm credentials={spotifyCredentials} />
      </Stack>
    </Card>
  </Stack>
);

AdminPage.layout = buildLayout<AdminPageProps>((page, { data: { viewer } }) => (
  <AppLayout
    title="Admin"
    breadcrumbs={[
      { title: "Home", href: "/" },
      { title: "Admin", href: "/admin" },
    ]}
    withContainer
    withGutter
    containerSize={440}
    {...{ viewer }}
  >
    {page}
  </AppLayout>
));

export default AdminPage;
