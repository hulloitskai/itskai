import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import LoginPageForm from "~/components/LoginPageForm";

export interface LoginPageProps extends SharedPageProps {
  failed: boolean;
}

const LoginPage: PageComponent<LoginPageProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign in</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Welcome back to{" "}
          <Anchor
            component={Link}
            href={routes.home.show.path()}
            fw={600}
            c="primary.4"
          >
            It&apos;s Kai
          </Anchor>
        </Text>
      </Stack>
      <LoginPageForm />
      <Text size="xs" c="gray.6">
        Don&apos;t have an account?{" "}
        <Anchor component={Link} href={routes.usersRegistrations.new.path()}>
          Sign up instead.
        </Anchor>
      </Text>
      <Divider />
      <List listStyleType="none" fz="xs">
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor
              component={Link}
              href={routes.usersPasswords.new.path()}
              inherit
            >
              Forgot your password?
            </Anchor>
          </Text>
        </List.Item>
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor
              component={Link}
              href={routes.usersConfirmations.new.path()}
              inherit
            >
              Didn&apos;t get a verification email?
            </Anchor>
          </Text>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

LoginPage.layout = page => (
  <AppLayout title="Sign in">
    <Center style={{ flexGrow: 1 }}>{page}</Center>
  </AppLayout>
);

export default LoginPage;
