import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserSettingsPageQuery } from "~/helpers/graphql";

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
      <Card radius="md" withBorder>
        <Stack spacing="xs">
          <Center>
            <Title order={2} size="h4">
              Profile
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
              Change your account email address
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
      title="My settings"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "My settings", href: "/user/settings" },
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
