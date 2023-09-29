import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";

import type { ErrorPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";

export type ErrorPageProps = PagePropsWithData<ErrorPageQuery> & {
  readonly title: string;
  readonly description: string;
  readonly code: number;
  readonly error?: string;
};

const ErrorPage: PageComponent<ErrorPageProps> = ({
  title,
  description,
  code,
  error,
}) => (
  <Container size="xs" my="xl">
    <Stack align="center">
      <Badge variant="outline" c="red">
        Status {code}
      </Badge>
      <Stack align="center" gap={2}>
        <Title size="h2">{title}</Title>
        <Text c="dark.3" style={{ textAlign: "center" }}>
          {description}
        </Text>
      </Stack>
      {!!error && (
        <Code block c="primary" style={{ alignSelf: "stretch" }}>
          Error: {error}
        </Code>
      )}
      <Button component={Link} href="/" mt={4}>
        Back to Home
      </Button>
    </Stack>
  </Container>
);

ErrorPage.layout = buildLayout<ErrorPageProps>(
  (page, { title, description, data }) => {
    const { viewer } = data;
    return (
      <AppLayout {...{ title, description }} {...{ viewer }}>
        {page}
      </AppLayout>
    );
  },
);

export default ErrorPage;
