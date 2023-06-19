import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserRequestEmailVerificationPageForm from "~/components/UserRequestEmailVerificationPageForm";

import type { UserRequestEmailVerificationPageQuery } from "~/helpers/graphql";

export type UserRequestEmailVerificationPageProps =
  PagePropsWithData<UserRequestEmailVerificationPageQuery>;

const UserRequestEmailVerificationPage: PageComponent<
  UserRequestEmailVerificationPageProps
> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack spacing={4}>
        <Title size="h3" align="center">
          Re-send verification email
        </Title>
        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.4 }}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to verify your account.
        </Text>
      </Stack>
      <UserRequestEmailVerificationPageForm />
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
        <Anchor component={Link} href="/user/password/reset">
          Forgot your password?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserRequestEmailVerificationPage.layout =
  buildLayout<UserRequestEmailVerificationPageProps>(
    (page, { data: { viewer } }) => (
      <AppLayout title="Sign In" {...{ viewer }}>
        <Center h="100%">{page}</Center>
      </AppLayout>
    ),
  );

export default UserRequestEmailVerificationPage;
