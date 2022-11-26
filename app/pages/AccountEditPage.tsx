import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import invariant from "tiny-invariant";

import AccountProfileForm from "~/components/AccountProfileForm";
import AccountEmailForm from "~/components/AccountEmailForm";
import AccountPasswordForm from "~/components/AccountPasswordForm";
import ICloudCredentialsForm from "~/components/ICloudCredentialsForm";

import type { AccountEditPageQuery } from "~/queries";

export type AccountEditPageProps = {
  readonly data: AccountEditPageQuery;
};

const AccountEditPage: PageComponent<AccountEditPageProps> = ({
  data: { viewer, icloudCredentials },
}) => {
  invariant(viewer, "missing viewer");
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
          <AccountProfileForm {...{ viewer }} />
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
          <AccountEmailForm {...{ viewer }} />
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
          <AccountPasswordForm />
        </Stack>
      </Card>
      {isOwner && (
        <Card radius="md" withBorder>
          <Stack spacing="xs">
            <Stack align="center" spacing={0}>
              <Title order={2} size="h4">
                iCloud
              </Title>
              <Text mt={-4} size="sm" color="dimmed">
                Authenticate with iCloud to enable dependent services.
              </Text>
            </Stack>
            <ICloudCredentialsForm {...{ icloudCredentials }} />
          </Stack>
        </Card>
      )}
    </Stack>
  );
};

AccountEditPage.layout = layoutWithData<AccountEditPageProps>(
  (page, { viewer }) => <CenterLayout {...{ viewer }}>{page}</CenterLayout>,
);

export default AccountEditPage;
