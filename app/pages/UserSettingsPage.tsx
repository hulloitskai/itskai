import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import type { DeepRequired } from "~/helpers/utils";

import UserSettingsPageProfileForm from "~/components/UserSettingsPageProfileForm";
import UserSettingsPageEmailForm from "~/components/UserSettingsPageEmailForm";
import UserSettingsPagePasswordForm from "~/components/UserSettingsPagePasswordForm";
import UserSettingsPageICloudCredentialsForm from "~/components/UserSettingsPageICloudCredentialsForm";
import UserSettingsPageLinearCredentialsForm from "~/components/UserSettingsPageLinearCredentialsForm";
import UserSettingsPageSpotifyCredentialsForm from "~/components/UserSettingsPageSpotifyCredentialsForm";

import type { UserSettingsPageQuery } from "~/queries";
import UserSettingsPageObsidianActions from "~/components/UserSettingsPageObsidianActions";

export type UserSettingsPageProps = {
  readonly data: DeepRequired<UserSettingsPageQuery, ["viewer"]>;
};

const UserSettingsPage: PageComponent<UserSettingsPageProps> = ({
  data: { viewer, icloudCredentials, linearCredentials, spotifyCredentials },
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
            <Text mt={-4} size="sm" color="dimmed">
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
            <Text mt={-4} size="sm" color="dimmed">
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
                <Text mt={-4} size="sm" color="dimmed">
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
                <Text mt={-4} size="sm" color="dimmed">
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
                  Linear
                </Title>
                <Text mt={-4} size="sm" color="dimmed">
                  Authorize Linear to enable issue management.
                </Text>
              </Stack>
              <UserSettingsPageLinearCredentialsForm
                {...{ linearCredentials }}
              />
            </Stack>
          </Card>
          <Card radius="md" withBorder>
            <Stack spacing="xs">
              <Stack align="center" spacing={0}>
                <Title order={2} size="h4">
                  Obsidian
                </Title>
                <Text mt={-4} size="sm" color="dimmed">
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
