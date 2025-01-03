import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import SignupPageForm from "~/components/SignupPageForm";

export interface SignupPageProps extends SharedPageProps {}

const SignupPage: PageComponent<SignupPageProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign up</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Create an account on{" "}
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
      <SignupPageForm />
      <Text size="xs" c="gray.6">
        Already have an account?{" "}
        <Anchor component={Link} href={routes.usersSessions.new.path()}>
          Sign in instead.
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

SignupPage.layout = page => (
  <AppLayout title="Sign up">
    <Center style={{ flexGrow: 1 }}>{page}</Center>
  </AppLayout>
);

export default SignupPage;
