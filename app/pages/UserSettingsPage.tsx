import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import type { DeepRequired } from "~/helpers/utils";

import UserSettingsPageProfileForm from "~/components/UserSettingsPageProfileForm";
import UserSettingsPageEmailForm from "~/components/UserSettingsPageEmailForm";
import UserSettingsPagePasswordForm from "~/components/UserSettingsPagePasswordForm";
import UserSettingsPageICloudCredentialsForm from "~/components/UserSettingsPageICloudCredentialsForm";
import UserSettingsPageSpotifyCredentialsForm from "~/components/UserSettingsPageSpotifyCredentialsForm";

import type { UserSettingsPageQuery } from "~/queries";
import UserSettingsPageObsidianActions from "~/components/UserSettingsPageObsidianActions";

export type UserSettingsPageProps = PageProps<
  DeepRequired<UserSettingsPageQuery, ["viewer"]>
>;

const UserSettingsPage: PageComponent<UserSettingsPageProps> = ({
  data: { viewer, icloudCredentials, spotifyCredentials },
}) => {
  const { isOwner } = viewer;
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
                  Authenticate with iCloud to enable knowledge graph services.
                </Text>
              </Stack>
              <UserSettingsPageICloudCredentialsForm
                {...{ icloudCredentials }}
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
                  Authorize Spotify to enable music services.
                </Text>
              </Stack>
              <UserSettingsPageSpotifyCredentialsForm
                {...{ spotifyCredentials }}
              />
            </Stack>
          </Card>
          <Card radius="md" withBorder>
            <Stack spacing="xs">
              <Stack align="center" spacing={0}>
                <Title order={2} size="h4">
                  Obsidian
                </Title>
                <Text size="sm" color="dimmed" lh={1.3}>
                  Synchronize or re-synchronize notes.
                </Text>
              </Stack>
              <UserSettingsPageObsidianActions />
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
