import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import SignUpForm from "~/components/SignUpForm";

import type { SignUpPageQuery } from "~/queries";

export type SignUpPageProps = {
  readonly data: SignUpPageQuery;
};

const SignUpPage: PageComponent = ({ errors }) => {
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
        <SignUpForm {...{ errors }} />
      </Stack>
    </Card>
  );
};

SignUpPage.layout = layoutWithData<SignUpPageProps>((page, { viewer }) => (
  <CenterLayout {...{ viewer }}>{page}</CenterLayout>
));

export default SignUpPage;
