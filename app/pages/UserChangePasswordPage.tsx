import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import { UserChangePasswordPageQuery } from "~/helpers/graphql";

import UserChangePasswordPageForm from "~/components/UserChangePasswordPageForm";

export type UserChangePasswordPageProps =
  PagePropsWithData<UserChangePasswordPageQuery> & {
    readonly resetPasswordToken: string;
  };

const UserChangePasswordPage: PageComponent<UserChangePasswordPageProps> = ({
  resetPasswordToken,
}) => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack spacing={4}>
        <Title size="h3" align="center">
          Change password
        </Title>
        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.4 }}>
          Enter a new password that you will use to sign into your account.
        </Text>
      </Stack>
      <UserChangePasswordPageForm {...{ resetPasswordToken }} />
      <Divider />
      <Stack spacing={0} fz="xs">
        <Text color="gray.6">
          <Anchor component={Link} href="/login">
            Sign In
          </Anchor>{" "}
          or{" "}
          <Anchor component={Link} href="/user/register">
            Sign Up
          </Anchor>
        </Text>
        <Anchor component={Link} href="/user/verification/resend">
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserChangePasswordPage.layout = buildLayout<UserChangePasswordPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign In" {...{ viewer }}>
      <Center sx={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default UserChangePasswordPage;
