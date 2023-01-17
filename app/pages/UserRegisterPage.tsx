import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserRegisterPageForm from "~/components/UserRegisterPageForm";

import type { UserRegisterPageQuery } from "~/queries";

export type UserRegisterPageProps = {
  readonly data: UserRegisterPageQuery;
};

const UserRegisterPage: PageComponent<UserRegisterPageProps> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack align="center" spacing={0}>
        <Title size="h3">Sign Up</Title>
        <Text size="sm" color="dimmed">
          Create an account on{" "}
          <Text color="dark.4" weight={600} span>
            Popshop
          </Text>
        </Text>
      </Stack>
      <UserRegisterPageForm />
      <Text size="xs" color="gray">
        Already have an account?{" "}
        <Anchor component={Link} href="/login" color="indigo">
          Sign in instead.
        </Anchor>
      </Text>
      <Divider />
      <Stack spacing={0} sx={({ fontSizes }) => ({ fontSize: fontSizes.xs })}>
        <Anchor component={Link} href="/user/password/reset" color="indigo">
          Forgot your password?
        </Anchor>
        <Anchor
          component={Link}
          href="/user/verification/resend"
          color="indigo"
        >
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
