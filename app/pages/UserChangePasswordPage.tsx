import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserChangePasswordPageForm from "~/components/UserChangePasswordPageForm";

import { UserChangePasswordPageQuery } from "~/queries";

export type UserChangePasswordPageProps =
  PageProps<UserChangePasswordPageQuery> & {
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
      <Stack spacing={0} sx={({ fontSizes }) => ({ fontSize: fontSizes.xs })}>
        <Text color="gray.6">
          <Anchor component={Link} href="/login" color="pink">
            Sign In
          </Anchor>{" "}
          or{" "}
          <Anchor component={Link} href="/user/register" color="pink">
            Sign Up
          </Anchor>
        </Text>
        <Anchor component={Link} href="/user/verification/resend" color="pink">
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserChangePasswordPage.layout = buildLayout<UserChangePasswordPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign In" {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default UserChangePasswordPage;
