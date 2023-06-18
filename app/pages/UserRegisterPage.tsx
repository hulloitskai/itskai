import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserRegisterPageForm from "~/components/UserRegisterPageForm";

import type { UserRegisterPageQuery } from "~/helpers/graphql";

export type UserRegisterPageProps = PagePropsWithData<UserRegisterPageQuery>;

const UserRegisterPage: PageComponent<UserRegisterPageProps> = () => {
  const theme = useMantineTheme();
  return (
    <Card w={380} radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={2}>
          <Title size="h3">Sign Up</Title>
          <Text size="sm" color="dimmed">
            Create an account on{" "}
            <Text
              span
              color={theme.colors[theme.primaryColor]![4]}
              weight={600}
            >
              it&apos;s kai
            </Text>
          </Text>
        </Stack>
        <UserRegisterPageForm />
        <Text size="xs" color="gray.6">
          Already have an account?{" "}
          <Anchor component={Link} href="/login">
            Sign in instead.
          </Anchor>
        </Text>
        <Divider />
        <Stack spacing={0} fz="xs">
          <Anchor component={Link} href="/user/password/reset">
            Forgot your password?
          </Anchor>
          <Anchor component={Link} href="/user/verification/resend">
            Didn&apos;t get a verification email?
          </Anchor>
        </Stack>
      </Stack>
    </Card>
  );
};

UserRegisterPage.layout = buildLayout<UserRegisterPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign Up" {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default UserRegisterPage;
