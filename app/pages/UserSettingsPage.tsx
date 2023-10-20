import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserSettingsPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import UserSettingsPageEmailForm from "~/components/UserSettingsPageEmailForm";
import UserSettingsPagePasswordForm from "~/components/UserSettingsPagePasswordForm";
import UserSettingsPageProfileForm from "~/components/UserSettingsPageProfileForm";

export type UserSettingsPageProps = PagePropsWithData<UserSettingsPageQuery>;

const UserSettingsPage: PageComponent<UserSettingsPageProps> = ({
  data: { viewer },
}) => {
  invariant(viewer, "Missing viewer");

  // == Markup
  return (
    <Stack>
      <Card withBorder>
        <Stack gap="sm">
          <Center>
            <Title order={2} size="h4">
              Profile
            </Title>
          </Center>
          <UserSettingsPageProfileForm {...{ viewer }} />
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
          <UserSettingsPageEmailForm {...{ viewer }} />
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
          <UserSettingsPagePasswordForm />
        </Stack>
      </Card>
    </Stack>
  );
};

UserSettingsPage.layout = buildLayout<UserSettingsPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="My account"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "My account", href: "/user/settings" },
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

export default UserSettingsPage;
