import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserSettingsPageQuery } from "~/helpers/graphql";

import UserSettingsPageEmailForm from "~/components/UserSettingsPageEmailForm";
import UserSettingsPagePasswordForm from "~/components/UserSettingsPagePasswordForm";
import UserSettingsPageProfileForm from "~/components/UserSettingsPageProfileForm";
import UserSettingsPageICloudCredentialsForm from "~/components/UserSettingsPageICloudCredentialsForm";
import UserSettingsPageInstagramCredentialsForm from "~/components/UserSettingsPageInstagramCredentialsForm";
import UserSettingsPageSpotifyCredentialsForm from "~/components/UserSettingsPageSpotifyCredentialsForm";
import UserSettingsPageSyncActions from "~/components/UserSettingsPageSyncActions";

export type UserSettingsPageProps = PagePropsWithData<UserSettingsPageQuery>;

const UserSettingsPage: PageComponent<UserSettingsPageProps> = ({
  data: { viewer, icloudCredentials, instagramCredentials, spotifyCredentials },
}) => {
  invariant(viewer, "Missing viewer");
  const { isOwner } = viewer;

  // == Markup
  return (
    <Stack>
      <Card radius="md" withBorder>
        <Stack spacing="xs">
          <Center>
            <Title order={2} size="h4">
              Profile Information
            </Title>
          </Center>
          <UserSettingsPageProfileForm {...{ viewer }} />
        </Stack>
      </Card>
      <Card radius="md" withBorder>
        <Stack spacing="xs">
          <Stack align="center" spacing={0}>
            <Title order={2} size="h4">
              Email Address
            </Title>
            <Text size="sm" color="dimmed" lh={1.3}>
              Change your account email address.
            </Text>
          </Stack>
          <UserSettingsPageEmailForm {...{ viewer }} />
        </Stack>
      </Card>
      <Card radius="md" withBorder>
        <Stack spacing="xs">
          <Stack align="center" spacing={0}>
            <Title order={2} size="h4">
              Password
            </Title>
            <Text size="sm" color="dimmed" lh={1.3}>
              Change your login password.
            </Text>
          </Stack>
          <UserSettingsPagePasswordForm />
        </Stack>
      </Card>
      {isOwner && (
        <>
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
              <UserSettingsPageICloudCredentialsForm
                credentials={icloudCredentials}
              />
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
              <UserSettingsPageInstagramCredentialsForm
                credentials={instagramCredentials}
              />
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
              <UserSettingsPageSpotifyCredentialsForm
                credentials={spotifyCredentials}
              />
            </Stack>
          </Card>
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
              <UserSettingsPageSyncActions />
            </Stack>
          </Card>
        </>
      )}
    </Stack>
  );
};

UserSettingsPage.layout = buildLayout<UserSettingsPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout withContainer withGutter containerSize={440} {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default UserSettingsPage;
