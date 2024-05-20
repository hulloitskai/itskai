import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import { UserLoginPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import UserLoginPageForm from "~/components/UserLoginPageForm";

export type UserLoginPageProps = PagePropsWithData<UserLoginPageQuery> & {
  readonly failed: boolean;
};

const UserLoginPage: PageComponent<UserLoginPageProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign in</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Welcome back to{" "}
          <Anchor component={Link} href="/" fw={600} c="primary.4">
            It&apos;s Kai
          </Anchor>
        </Text>
      </Stack>
      <UserLoginPageForm />
      <Text size="xs" c="gray.6">
        Don&apos;t have an account?{" "}
        <Anchor component={Link} href="/signup">
          Sign up instead.
        </Anchor>
      </Text>
      <Divider />
      <Stack gap={0} fz="xs">
        <Anchor component={Link} href="/password/reset" inherit>
          Forgot your password?
        </Anchor>
        <Anchor component={Link} href="/verification/resend" inherit>
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserLoginPage.layout = buildLayout<UserLoginPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign in" {...{ viewer }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default UserLoginPage;
