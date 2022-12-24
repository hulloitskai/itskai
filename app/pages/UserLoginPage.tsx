import { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserLoginPageForm from "~/components/UserLoginPageForm";

import { UserLoginPageQuery } from "~/queries";

export type UserLoginPageProps = {
  readonly data: UserLoginPageQuery;
};

const UserLoginPage: PageComponent = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack align="center" spacing={0}>
        <Title size="h3">Sign In</Title>
        <Text size="sm" color="dimmed">
          Welcome back to{" "}
          <Text color="dark.4" weight={600} span>
            It&apos;s Kai!
          </Text>
        </Text>
      </Stack>
      <UserLoginPageForm />
      <Text size="xs" color="gray">
        Don&apos;t have an account?{" "}
        <Anchor component={Link} href="/user/register" color="indigo">
          Sign up instead.
        </Anchor>
      </Text>
    </Stack>
  </Card>
);

UserLoginPage.layout = buildLayout<UserLoginPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign In" {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default UserLoginPage;
