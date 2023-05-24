import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserLoginPageForm from "~/components/UserLoginPageForm";

import { UserLoginPageQuery } from "~/queries";

export type UserLoginPageProps = PageProps<UserLoginPageQuery> & {
  readonly failed: boolean;
};

const UserLoginPage: PageComponent<UserLoginPageProps> = () => {
  const theme = useMantineTheme();
  return (
    <Card w={380} radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={2}>
          <Title size="h3">Sign In</Title>
          <Text size="sm" color="dimmed">
            Welcome back to{" "}
            <Text
              span
              color={theme.colors[theme.primaryColor]![4]}
              weight={600}
            >
              it&apos;s kai
            </Text>
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
};

UserLoginPage.layout = buildLayout<UserLoginPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign In" {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default UserLoginPage;
