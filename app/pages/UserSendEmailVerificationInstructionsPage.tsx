import { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserSendEmailVerificationInstructionsPageForm from "~/components/UserSendEmailVerificationInstructionsPageForm";

import { UserSendEmailVerificationInstructionsPageQuery } from "~/queries";

export type UserSendEmailVerificationInstructionsPageProps = {
  readonly data: UserSendEmailVerificationInstructionsPageQuery;
};

const UserSendEmailVerificationInstructionsPage: PageComponent<
  UserSendEmailVerificationInstructionsPageProps
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
      <UserSendEmailVerificationInstructionsPageForm />
      <Divider />
      <Stack spacing={0} sx={({ fontSizes }) => ({ fontSize: fontSizes.xs })}>
        <Text>
          <Anchor component={Link} href="/login" color="indigo">
            Sign In
          </Anchor>{" "}
          or{" "}
          <Anchor component={Link} href="/user/register" color="indigo">
            Sign Up
          </Anchor>
        </Text>
        <Anchor component={Link} href="/user/password/reset" color="indigo">
          Forgot your password?
        </Anchor>
      </Stack>
    </Stack>
  </Card>
);

UserSendEmailVerificationInstructionsPage.layout =
  buildLayout<UserSendEmailVerificationInstructionsPageProps>(
    (page, { data: { viewer } }) => (
      <AppLayout title="Sign In" {...{ viewer }}>
        <Center h="100%">{page}</Center>
      </AppLayout>
    ),
  );

export default UserSendEmailVerificationInstructionsPage;
