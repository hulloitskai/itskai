import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserSignupPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import UserSignupPageForm from "~/components/UserSignupPageForm";

export type UserSignupPageProps = PagePropsWithData<UserSignupPageQuery>;

const UserSignupPage: PageComponent<UserSignupPageProps> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign up</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Create an account on{" "}
          <Anchor component={Link} href="/" fw={600} c="primary.4">
            It&apos;s Kai
          </Anchor>
        </Text>
      </Stack>
      <UserSignupPageForm />
      <Text size="xs" c="gray.6">
        Already have an account?{" "}
        <Anchor component={Link} href="/login">
          Sign in instead.
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

UserSignupPage.layout = buildLayout<UserSignupPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign up" {...{ viewer }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default UserSignupPage;
