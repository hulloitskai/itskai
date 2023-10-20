import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import { UserChangePasswordPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import UserChangePasswordPageForm from "~/components/UserChangePasswordPageForm";

export type UserChangePasswordPageProps =
  PagePropsWithData<UserChangePasswordPageQuery> & {
    readonly resetPasswordToken: string;
  };

const UserChangePasswordPage: PageComponent<UserChangePasswordPageProps> = ({
  resetPasswordToken,
}) => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" style={{ textAlign: "center" }}>
          Change password
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          Enter a new password that you will use to sign into your account.
        </Text>
      </Stack>
      <UserChangePasswordPageForm {...{ resetPasswordToken }} />
      <Divider />
      <Stack gap={0} fz="xs">
        <Text inherit c="gray.6">
          <Anchor component={Link} href="/login" inherit>
            Sign in
          </Anchor>{" "}
          or{" "}
          <Anchor component={Link} href="/user/register" inherit>
            Sign up
          </Anchor>
        </Text>
        <Anchor component={Link} href="/user/verification/resend" inherit>
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserChangePasswordPage.layout = buildLayout<UserChangePasswordPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign in" {...{ viewer }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default UserChangePasswordPage;
