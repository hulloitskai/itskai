import { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserSendPasswordResetInstructionsPageForm from "~/components/UserSendPasswordResetInstructionsPageForm";

import { UserSendPasswordResetInstructionsPageQuery } from "~/queries";

export type UserSendPasswordResetInstructionsPageProps = {
  readonly data: UserSendPasswordResetInstructionsPageQuery;
};

const UserSendPasswordResetInstructionsPage: PageComponent<
  UserSendPasswordResetInstructionsPageProps
> = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack spacing={4}>
        <Title size="h3" align="center">
          Reset your password
        </Title>
        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.4 }}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </Text>
      </Stack>
      <UserSendPasswordResetInstructionsPageForm />
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

UserSendPasswordResetInstructionsPage.layout =
  buildLayout<UserSendPasswordResetInstructionsPageProps>(
    (page, { data: { viewer } }) => (
      <AppLayout title="Sign In" {...{ viewer }}>
        <Center h="100%">{page}</Center>
      </AppLayout>
    ),
  );

export default UserSendPasswordResetInstructionsPage;
