import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import SettingsPageEmailForm from "~/components/SettingsPageEmailForm";
import SettingsPagePasswordForm from "~/components/SettingsPagePasswordForm";
import SettingsPageProfileForm from "~/components/SettingsPageProfileForm";

import type { SettingsPageQuery } from "~/helpers/graphql";

export type SettingsPageProps = PagePropsWithData<SettingsPageQuery>;

const SettingsPage: PageComponent<SettingsPageProps> = ({
  data: { viewer },
}) => {
  invariant(viewer, "Missing viewer");

  return (
    <Stack>
      <Card withBorder>
        <Stack gap="sm">
          <Center>
            <Title order={2} size="h4">
              Profile
            </Title>
          </Center>
          <SettingsPageProfileForm {...{ viewer }} />
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
          <SettingsPageEmailForm {...{ viewer }} />
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

SettingsPage.layout = buildLayout<SettingsPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Settings"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Settings", href: "/settings" },
      ]}
      withContainer
      withGutter
      containerSize={440}
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default SettingsPage;
