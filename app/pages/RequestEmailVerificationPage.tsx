import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import RequestEmailVerificationPageForm from "~/components/RequestEmailVerificationPageForm";

import { SharedPageProps } from "~/types";

export interface RequestEmailVerificationPageProps extends SharedPageProps {}

const RequestEmailVerificationPage: PageComponent<
  RequestEmailVerificationPageProps
> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" style={{ textAlign: "center" }}>
          Re-send verification email
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to verify your account.
        </Text>
      </Stack>
      <RequestEmailVerificationPageForm />
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
          <Anchor component={Link} href="/password/reset" inherit>
            Forgot your password?
          </Anchor>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

RequestEmailVerificationPage.layout =
  buildLayout<RequestEmailVerificationPageProps>(page => (
    <AppLayout title="Request email verification">
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ));

export default RequestEmailVerificationPage;
