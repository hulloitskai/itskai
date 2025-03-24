import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import SignupPageForm from "~/components/SignupPageForm";

export interface SignupPageProps extends SharedPageProps {}

const SignupPage: PageComponent<SignupPageProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">sign up</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          create an account on{" "}
          <Anchor
            component={Link}
            href={routes.home.show.path()}
            fw={600}
            c="primary.4"
          >
            it&apos;s kai
          </Anchor>
        </Text>
      </Stack>
      <SignupPageForm />
      <Text size="xs" c="gray.6">
        already have an account?{" "}
        <Anchor component={Link} href={routes.usersSessions.new.path()}>
          sign in instead.
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
              forgot your password?
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
              didn&apos;t get a verification email?
            </Anchor>
          </Text>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

SignupPage.layout = page => (
  <AppLayout title="sign up">
    <Center style={{ flexGrow: 1 }}>{page}</Center>
  </AppLayout>
);

export default SignupPage;
