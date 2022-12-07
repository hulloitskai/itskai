import { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import AccountSignInPageForm from "~/components/AccountSignInPageForm";

import { AccountSignInPageQuery } from "~/queries";

export type AccountSignInPageProps = {
  readonly data: AccountSignInPageQuery;
};

const AccountSignInPage: PageComponent = () => {
  return (
    <Card w={380} radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title size="h3">Sign In</Title>
          <Text size="sm" color="dimmed">
            Welcome back to{" "}
            <Text color="dark.4" weight={600} span>
              It&apos;s Kai!
            </Text>
          </Text>
        </Stack>
        <AccountSignInPageForm />
        <Text size="xs" color="gray">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} href="/account/sign_up" color="indigo">
            Sign up instead.
          </Anchor>
        </Text>
      </Stack>
    </Card>
  );
};

AccountSignInPage.layout = layoutWithData<AccountSignInPageProps>(
  (page, { viewer }) => (
    <AppLayout {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default AccountSignInPage;
