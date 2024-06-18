import type { PageComponent } from "~/helpers/inertia";
import type { SharedPageProps } from "~/types";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import SignupPageForm from "~/components/SignupPageForm";

export interface SignupPageProps extends SharedPageProps {}

const SignupPage: PageComponent<SignupPageProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign Up</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Create an account on{" "}
          <Anchor component={Link} href="/" fw={600} c="primary.4">
            It&apos;s Kai
          </Anchor>
        </Text>
      </Stack>
      <SignupPageForm />
      <Text size="xs" c="gray.6">
        Already have an account?{" "}
        <Anchor component={Link} href="/login">
          Sign in instead.
        </Anchor>
      </Text>
      <Divider />
      <List listStyleType="none" fz="xs">
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor component={Link} href="/password/reset" inherit>
              Forgot your password?
            </Anchor>
          </Text>
        </List.Item>
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor component={Link} href="/email_verification/resend" inherit>
              Didn&apos;t get a verification email?
            </Anchor>
          </Text>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

SignupPage.layout = buildLayout<SignupPageProps>(
  (page, { currentUser: authenticatedUser }) => (
    <AppLayout title="Sign Up" {...{ authenticatedUser }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default SignupPage;
