import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";
import RequestPasswordResetPageForm from "~/components/RequestPasswordResetPageForm";

import type { RequestPasswordResetPageQuery } from "~/helpers/graphql";

export type RequestPasswordResetPageProps =
  PagePropsWithData<RequestPasswordResetPageQuery>;

const RequestPasswordResetPage: PageComponent<
  RequestPasswordResetPageProps
> = () => (
  <Card w={380} withBorder>
    <Stack gap="xs">
      <Stack gap={4}>
        <Title size="h3" style={{ textAlign: "center" }}>
          Reset your password
        </Title>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </Text>
      </Stack>
      <RequestPasswordResetPageForm />
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
          <Anchor component={Link} href="/verification/resend" inherit>
            Didn&apos;t get a verification email?
          </Anchor>
        </List.Item>
      </List>
    </Stack>
  </Card>
);

RequestPasswordResetPage.layout = buildLayout<RequestPasswordResetPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Sign in" {...{ viewer }}>
      <Center style={{ flexGrow: 1 }}>{page}</Center>
    </AppLayout>
  ),
);

export default RequestPasswordResetPage;
