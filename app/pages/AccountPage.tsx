import { Text } from "@mantine/core";

import AccountPageDeleteAccountForm from "~/components/AccountPageDeleteAccountForm";
import AccountPageEmailForm from "~/components/AccountPageEmailForm";
import AccountPagePasswordForm from "~/components/AccountPagePasswordForm";
import AccountPageProfileForm from "~/components/AccountPageProfileForm";
import AppLayout from "~/components/AppLayout";
import { type User } from "~/types";

interface AccountPageProps extends SharedPageProps {
  currentUser: User;
}

const AccountPage: PageComponent<AccountPageProps> = ({ currentUser }) => (
  <Stack>
    <Card withBorder>
      <Stack gap="sm">
        <Center>
          <Title order={2} size="h4">
            your profile
          </Title>
        </Center>
        <AccountPageProfileForm
          {...{ currentUser }}
          onProfileUpdated={() => {
            router.reload({ only: ["currentUser"] });
          }}
        />
      </Stack>
    </Card>
    <Card withBorder>
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4">
            email address
          </Title>
          <Text size="sm" c="dimmed">
            change your account email address
          </Text>
        </Stack>
        <AccountPageEmailForm
          {...{ currentUser }}
          onEmailChanged={() => {
            router.reload({ only: ["currentUser"] });
          }}
        />
      </Stack>
    </Card>
    <Card withBorder>
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4">
            password
          </Title>
          <Text size="sm" c="dimmed">
            change your login password
          </Text>
        </Stack>
        <AccountPagePasswordForm />
      </Stack>
    </Card>
    <Card withBorder bd="red.outline">
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4">
            danger zone
          </Title>
          <Text size="sm" c="dimmed">
            destructive actions, and the like.
          </Text>
        </Stack>
        <AccountPageDeleteAccountForm />
      </Stack>
    </Card>
  </Stack>
);

AccountPage.layout = page => (
  <AppLayout
    title="account"
    breadcrumbs={[
      { title: "home", href: routes.home.show.path() },
      { title: "account", href: routes.usersRegistrations.edit.path() },
    ]}
    withContainer
    withGutter
    containerSize={440}
  >
    {page}
  </AppLayout>
);

export default AccountPage;
