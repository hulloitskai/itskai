import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserRegisterPageForm from "~/components/UserRegisterPageForm";

import type { UserRegisterPageQuery } from "~/queries";

export type UserRegisterPageProps = PageProps<UserRegisterPageQuery>;

const UserRegisterPage: PageComponent<UserRegisterPageProps> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack align="center" spacing={0}>
        <Title size="h3">Sign Up</Title>
        <Text size="sm" color="dimmed">
          Create an account on{" "}
          <Text color="pink.4" weight={600} span>
            it&apos;s kai
          </Text>
        </Text>
      </Stack>
      <UserRegisterPageForm />
      <Text size="xs" color="gray.6">
        Already have an account?{" "}
        <Anchor component={Link} href="/login" color="pink">
          Sign in instead.
        </Anchor>
      </Text>
      <Divider />
      <Stack spacing={0} fz="xs">
        <Anchor component={Link} href="/user/password/reset" color="pink">
          Forgot your password?
        </Anchor>
        <Anchor component={Link} href="/user/verification/resend" color="pink">
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserRegisterPage.layout = buildLayout<UserRegisterPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign Up" {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default UserRegisterPage;
