import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import SettingsPageDeleteAccountForm from "~/components/SettingsPageDeleteAccountForm";
import SettingsPageEmailForm from "~/components/SettingsPageEmailForm";
import SettingsPagePasswordForm from "~/components/SettingsPagePasswordForm";
import SettingsPageProfileForm from "~/components/SettingsPageProfileForm";

const SettingsPage: PageComponent = () => (
  <Stack>
    <Card withBorder>
      <Stack gap="sm">
        <Center>
          <Title order={2} size="h4">
            Profile
          </Title>
        </Center>
        <SettingsPageProfileForm
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
          <Text size="sm" c="dimmed" lh={1.3}>
            Change your account email address
          </Text>
        </Stack>
        <SettingsPageEmailForm
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
          <Text size="sm" c="dimmed" lh={1.3}>
            Change your login password
          </Text>
        </Stack>
        <SettingsPagePasswordForm />
      </Stack>
    </Card>
    <Card withBorder bd="red.outline">
      <Stack gap="sm">
        <Center>
          <Title order={2} size="h4">
            Danger zone
          </Title>
        </Center>
        <SettingsPageDeleteAccountForm />
      </Stack>
    </Card>
  </Stack>
);

SettingsPage.layout = page => (
  <AppLayout
    title="Settings"
    breadcrumbs={[
      { title: "Home", href: routes.home.show.path() },
      { title: "Settings", href: routes.usersRegistrations.edit.path() },
    ]}
    withContainer
    withGutter
    containerSize={440}
  >
    {page}
  </AppLayout>
);

export default SettingsPage;
