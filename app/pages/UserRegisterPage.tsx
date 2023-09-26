import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserRegisterPageQuery } from "~/helpers/graphql";

import UserRegisterPageForm from "~/components/UserRegisterPageForm";

export type UserRegisterPageProps = PagePropsWithData<UserRegisterPageQuery>;

const UserRegisterPage: PageComponent<UserRegisterPageProps> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack gap="xs">
      <Stack align="center" gap={2}>
        <Title size="h3">Sign up</Title>
        <Text size="sm" c="dimmed" lh={1.3}>
          Create an account on{" "}
          <Anchor component={Link} href="/" fw={600} c="brand.4">
            It&apos;s Kai
          </Anchor>
        </Text>
      </Stack>
      <UserRegisterPageForm />
      <Text size="xs" c="gray.6">
        Already have an account?{" "}
        <Anchor component={Link} href="/login">
          Sign in instead.
        </Anchor>
      </Text>
      <Divider />
      <Stack gap={0} fz="xs">
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

UserRegisterPage.layout = buildLayout<UserRegisterPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign up" {...{ viewer }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default UserRegisterPage;
