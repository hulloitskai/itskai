import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import type { SharedPageProps } from "~/types";

import AppLayout from "~/components/AppLayout";
import SettingsPageEmailForm from "~/components/SettingsPageEmailForm";
import SettingsPagePasswordForm from "~/components/SettingsPagePasswordForm";
import SettingsPageProfileForm from "~/components/SettingsPageProfileForm";

export interface SettingsPageProps extends SharedPageProps {}

const SettingsPage: PageComponent<SettingsPageProps> = () => {
  return (
    <Stack>
      <Card withBorder>
        <Stack gap="sm">
          <Center>
            <Title order={2} size="h4">
              Profile
            </Title>
          </Center>
          <SettingsPageProfileForm />
        </Stack>
      </Card>
      <Card withBorder>
        <Stack gap="sm">
          <Stack align="center" gap={0}>
            <Title order={2} size="h4">
              Email Address
            </Title>
            <Text size="sm" c="dimmed" lh={1.3}>
              Change your account email address
            </Text>
          </Stack>
          <SettingsPageEmailForm />
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
    </Stack>
  );
};

SettingsPage.layout = buildLayout<SettingsPageProps>(page => (
  <AppLayout
    title="Settings"
    breadcrumbs={[
      { title: "Home", href: "/" },
      { title: "Settings", href: "/settings" },
    ]}
    withContainer
    withGutter
    containerSize={440}
  >
    {page}
  </AppLayout>
));

export default SettingsPage;
