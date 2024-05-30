import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import ChangePasswordPageForm from "~/components/ChangePasswordPageForm";

import type { ChangePasswordPageQuery } from "~/helpers/graphql";

export type ChangePasswordPageProps =
  PagePropsWithData<ChangePasswordPageQuery> & {
    resetPasswordToken: string;
  };

const ChangePasswordPage: PageComponent<ChangePasswordPageProps> = ({
  resetPasswordToken,
}) => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" style={{ textAlign: "center" }}>
          Change password
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          Enter a new password that you will use to sign into your account.
        </Text>
      </Stack>
      <ChangePasswordPageForm {...{ resetPasswordToken }} />
      <Divider />
      <List listStyleType="none" fz="xs">
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor component={Link} href="/login" inherit>
              Sign in
            </Anchor>{" "}
            or{" "}
            <Anchor component={Link} href="/signup" inherit>
              Sign up
            </Anchor>
          </Text>
        </List.Item>
        <List.Item>
          <Anchor component={Link} href="/email_verification/resend" inherit>
            Didn&apos;t get a verification email?
          </Anchor>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

ChangePasswordPage.layout = buildLayout<ChangePasswordPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign in" {...{ viewer }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default ChangePasswordPage;
