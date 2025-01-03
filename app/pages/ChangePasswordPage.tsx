import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import ChangePasswordPageForm from "~/components/ChangePasswordPageForm";
import { type SharedPageProps } from "~/types";

export interface ChangePasswordPageProps extends SharedPageProps {
  resetPasswordToken: string;
}

const ChangePasswordPage: PageComponent<ChangePasswordPageProps> = ({
  resetPasswordToken,
}) => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" ta="center">
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
            <Anchor
              component={Link}
              href={routes.usersSessions.new.path()}
              inherit
            >
              Sign in
            </Anchor>{" "}
            or{" "}
            <Anchor
              component={Link}
              href={routes.usersRegistrations.new.path()}
              inherit
            >
              Sign up
            </Anchor>
          </Text>
        </List.Item>
        <List.Item>
          <Anchor
            component={Link}
            href={routes.usersConfirmations.new.path()}
            inherit
          >
            Didn&apos;t get a verification email?
          </Anchor>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

ChangePasswordPage.layout = page => (
  <AppLayout title="Change password">
    <Center style={{ flexGrow: 1 }}>{page}</Center>
  </AppLayout>
);

export default ChangePasswordPage;
