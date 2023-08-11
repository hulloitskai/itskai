import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import { UserLoginPageQuery } from "~/helpers/graphql";

import UserLoginPageForm from "~/components/UserLoginPageForm";

export type UserLoginPageProps = PagePropsWithData<UserLoginPageQuery> & {
  readonly failed: boolean;
};

const UserLoginPage: PageComponent<UserLoginPageProps> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack align="center" spacing={2}>
        <Title size="h3">Sign In</Title>
        <Text size="sm" color="dimmed">
          Welcome back to{" "}
          <Anchor component={Link} href="/" color="brand.4" weight={600}>
            it&apos;s kai
          </Anchor>
        </Text>
      </Stack>
      <UserLoginPageForm />
      <Text size="xs" color="gray.6">
        Don&apos;t have an account?{" "}
        <Anchor component={Link} href="/user/register">
          Sign up instead.
        </Anchor>
      </Text>
      <Divider />
      <Stack spacing={0} fz="xs">
        <Anchor component={Link} href="/user/password/reset">
          Forgot your password?
        </Anchor>
        <Anchor component={Link} href="/user/verification/resend">
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserLoginPage.layout = buildLayout<UserLoginPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign In" {...{ viewer }}>
      <Center sx={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default UserLoginPage;
