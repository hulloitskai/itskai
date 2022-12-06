import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import invariant from "tiny-invariant";

import AccountEditPageProfileForm from "~/components/AccountEditPageProfileForm";
import AccountEditPageEmailForm from "~/components/AccountEditPageEmailForm";
import AccountEditPagePasswordForm from "~/components/AccountEditPagePasswordForm";
import AccountEditPageICloudCredentialsForm from "~/components/AccountEditPageICloudCredentialsForm";
import AccountEditPageSpotifyCredentialsForm from "~/components/AccountEditPageSpotifyCredentialsForm";

import type { DeepRequired } from "~/helpers/utils";
import type { AccountEditPageQuery } from "~/queries";

export type AccountEditPageProps = {
  readonly data: DeepRequired<AccountEditPageQuery, ["viewer"]>;
};

const AccountEditPage: PageComponent<AccountEditPageProps> = ({
  data: { viewer, icloudCredentials, spotifyCredentials },
}) => {
  invariant(viewer, "Missing viewer");
  const { isOwner } = viewer;
  return (
    <Stack w={440}>
      <Card radius="md" withBorder>
        <Stack spacing="xs">
          <Center>
            <Title order={2} size="h4">
              Profile Information
            </Title>
          </Center>
          <AccountEditPageProfileForm {...{ viewer }} />
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
          <AccountEditPageEmailForm {...{ viewer }} />
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
          <AccountEditPagePasswordForm />
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
              <AccountEditPageICloudCredentialsForm
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
              <AccountEditPageSpotifyCredentialsForm
                {...{ spotifyCredentials }}
              />
            </Stack>
          </Card>{" "}
        </>
      )}
    </Stack>
  );
};

AccountEditPage.layout = layoutWithData<AccountEditPageProps>(
  (page, { viewer }) => (
    <AppLayout withContainer={false} {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default AccountEditPage;
