import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";

import type { ErrorPageQuery } from "~/helpers/graphql";

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
      <Badge variant="outline" color="red">
        Status {code}
      </Badge>
      <Stack align="center" spacing={2}>
        <Title size="h2">{title}</Title>
        <Text color="dark.3" align="center">
          {description}
        </Text>
      </Stack>
      {!!error && (
        <Code block color="primary" sx={{ alignSelf: "stretch" }}>
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
