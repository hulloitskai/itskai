import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import AccountSignUpForm from "~/components/AccountSignUpForm";

import type { AccountSignUpPageQuery } from "~/queries";

export type AccountSignUpPageProps = {
  readonly data: AccountSignUpPageQuery;
};

const AccountSignUpPage: PageComponent = ({ errors }) => {
  const signUpFormErrors = useBaggedErrors(errors, "AccountSignUpForm");
  return (
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
        <AccountSignUpForm errors={signUpFormErrors} />
        <Text size="xs" color="gray">
          Already have an account?{" "}
          <Anchor component={Link} href="/account/sign_in" color="indigo">
            Sign in instead.
          </Anchor>
        </Text>
      </Stack>
    </Card>
  );
};

AccountSignUpPage.layout = layoutWithData<AccountSignUpPageProps>(
  (page, { viewer }) => <CenterLayout {...{ viewer }}>{page}</CenterLayout>,
);

export default AccountSignUpPage;
