import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import SignInForm from "~/components/SignInForm";

import { SignInPageQuery } from "~/queries";

export type SignInPageProps = {
  readonly data: SignInPageQuery;
};

const SignInPage: PageComponent = ({ errors }) => {
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
        <SignInForm {...{ errors }} />
      </Stack>
    </Card>
  );
};

SignInPage.layout = layoutWithData<SignInPageProps>((page, { viewer }) => (
  <CenterLayout {...{ viewer }}>{page}</CenterLayout>
));

export default SignInPage;
