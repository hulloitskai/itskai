import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import RequestPasswordResetPageForm from "~/components/RequestPasswordResetPageForm";

export interface RequestPasswordResetPageProps extends SharedPageProps {}

const RequestPasswordResetPage: PageComponent<
  RequestPasswordResetPageProps
> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" ta="center">
          reset your password
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </Text>
      </Stack>
      <RequestPasswordResetPageForm />
      <Divider />
      <List listStyleType="none" fz="xs">
        <List.Item>
          <Text span inherit c="gray.6">
            <Anchor
              component={Link}
              href={routes.usersSessions.new.path()}
              inherit
            >
              sign in
            </Anchor>{" "}
            or{" "}
            <Anchor
              component={Link}
              href={routes.usersRegistrations.new.path()}
              inherit
            >
              sign up
            </Anchor>
          </Text>
        </List.Item>
        <List.Item>
          <Anchor
            component={Link}
            href={routes.usersConfirmations.new.path()}
            inherit
          >
            didn&apos;t get a verification email?
          </Anchor>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

RequestPasswordResetPage.layout = page => (
  <AppLayout title="Request password reset">
    <Center style={{ flexGrow: 1 }}>{page}</Center>
  </AppLayout>
);

export default RequestPasswordResetPage;
