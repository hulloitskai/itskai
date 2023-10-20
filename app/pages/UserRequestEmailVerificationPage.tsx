import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { UserRequestEmailVerificationPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import UserRequestEmailVerificationPageForm from "~/components/UserRequestEmailVerificationPageForm";

export type UserRequestEmailVerificationPageProps =
  PagePropsWithData<UserRequestEmailVerificationPageQuery>;

const UserRequestEmailVerificationPage: PageComponent<
  UserRequestEmailVerificationPageProps
> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" style={{ textAlign: "center" }}>
          Re-send verification email
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to verify your account.
        </Text>
      </Stack>
      <UserRequestEmailVerificationPageForm />
      <Divider />
      <Stack gap={0} fz="xs">
        <Text c="gray.6" inherit>
          <Anchor component={Link} href="/login" inherit>
            Sign in
          </Anchor>{" "}
          or{" "}
          <Anchor component={Link} href="/user/register" inherit>
            Sign up
          </Anchor>
        </Text>
        <Anchor component={Link} href="/user/password/reset" inherit>
          Forgot your password?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserRequestEmailVerificationPage.layout =
  buildLayout<UserRequestEmailVerificationPageProps>(
    (page, { data: { viewer } }) => (
      <AppLayout title="Sign in" {...{ viewer }}>
        <Center style={{ flexGrow: 1 }}>{page}</Center>
      </AppLayout>
    ),
  );

export default UserRequestEmailVerificationPage;
