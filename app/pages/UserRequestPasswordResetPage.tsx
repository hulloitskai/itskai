import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserRequestPasswordResetPageQuery } from "~/helpers/graphql";

import UserRequestPasswordResetPageForm from "~/components/UserRequestPasswordResetPageForm";

export type UserRequestPasswordResetPageProps =
  PagePropsWithData<UserRequestPasswordResetPageQuery>;

const UserRequestPasswordResetPage: PageComponent<
  UserRequestPasswordResetPageProps
> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" style={{ textAlign: "center" }}>
          Reset your password
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </Text>
      </Stack>
      <UserRequestPasswordResetPageForm />
      <Divider />
      <Stack gap={0} fz="xs">
        <Text c="gray.6">
          <Anchor component={Link} href="/login">
            Sign in
          </Anchor>{" "}
          or{" "}
          <Anchor component={Link} href="/user/register">
            Sign up
          </Anchor>
        </Text>
        <Anchor component={Link} href="/user/verification/resend">
          Didn&apos;t get a verification email?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserRequestPasswordResetPage.layout =
  buildLayout<UserRequestPasswordResetPageProps>(
    (page, { data: { viewer } }) => (
      <AppLayout title="Sign in" {...{ viewer }}>
        <Center style={{ flexGrow: 1 }}>{page}</Center>
      </AppLayout>
    ),
  );

export default UserRequestPasswordResetPage;
