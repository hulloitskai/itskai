import { Text } from "@mantine/core";

import AccountPageDeleteAccountForm from "~/components/AccountPageDeleteAccountForm";
import AccountPageEmailForm from "~/components/AccountPageEmailForm";
import AccountPagePasswordForm from "~/components/AccountPagePasswordForm";
import AccountPageProfileForm from "~/components/AccountPageProfileForm";
import AppLayout from "~/components/AppLayout";

const AccountPage: PageComponent = () => (
  <Stack>
    <Card withBorder>
      <Stack gap="sm">
        <Center>
          <Title order={2} size="h4">
            Your profile
          </Title>
        </Center>
        <AccountPageProfileForm
          onUpdated={() => {
            router.reload({ only: ["currentUser"] });
          }}
        />
      </Stack>
    </Card>
    <Card withBorder>
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4">
            Email address
          </Title>
          <Text size="sm" c="dimmed" lh="xs">
            Change your account email address
          </Text>
        </Stack>
        <AccountPageEmailForm
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
            Password
          </Title>
          <Text size="sm" c="dimmed" lh="xs">
            Change your login password
          </Text>
        </Stack>
        <AccountPagePasswordForm />
      </Stack>
    </Card>
    <Card withBorder bd="red.outline">
      <Stack gap="sm">
        <Stack align="center" gap={0}>
          <Title order={2} size="h4">
            Danger zone
          </Title>
          <Text size="sm" c="dimmed" lh="xs">
            Destructive actions, and the like.
          </Text>
        </Stack>
        <AccountPageDeleteAccountForm />
      </Stack>
    </Card>
  </Stack>
);

AccountPage.layout = page => (
  <AppLayout
    title="Account"
    breadcrumbs={[
      { title: "Home", href: routes.home.show.path() },
      { title: "Account", href: routes.usersRegistrations.edit.path() },
    ]}
    withContainer
    withGutter
    containerSize={440}
  >
    {page}
  </AppLayout>
);

export default AccountPage;
