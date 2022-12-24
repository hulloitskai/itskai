import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import UserRegisterPageForm from "~/components/UserRegisterPageForm";

import type { UserRegisterPageQuery } from "~/queries";

export type UserRegisterPageProps = {
  readonly data: UserRegisterPageQuery;
};

const UserRegisterPage: PageComponent = () => (
  <Card w={380} radius="md" withBorder>
    <Stack spacing="xs">
      <Stack align="center" spacing={0}>
        <Title size="h3">Sign Up</Title>
        <Text size="sm" color="dimmed">
          Create an account on{" "}
          <Text color="dark.4" weight={600} span>
            It&apos;s Kai!
          </Text>
        </Text>
      </Stack>
      <UserRegisterPageForm />
      <Text size="xs" color="gray">
        Already have an account?{" "}
        <Anchor component={Link} href="/user/login" color="indigo">
          Sign in instead.
        </Anchor>
      </Text>
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
