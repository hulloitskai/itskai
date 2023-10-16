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
  <Stack align="center">
    <Badge variant="outline" color="red">
      Status {code}
    </Badge>
    <Stack align="center" gap={2}>
      <Title size="h2">{title}</Title>
      <Text c="dimmed" style={{ textAlign: "center" }}>
        {description}
      </Text>
    </Stack>
    {!!error && (
      <Code block style={{ alignSelf: "stretch", textTransform: "none" }}>
        Error: {error}
      </Code>
    )}
    <Button component={Link} href="/" mt={4}>
      Back to Home
    </Button>
  </Stack>
);

ErrorPage.layout = buildLayout<ErrorPageProps>(
  (page, { title, description, data }) => {
    const { viewer } = data;
    return (
      <AppLayout
        withContainer
        containerSize="xs"
        containerProps={{ my: "xl" }}
        {...{ title, description, viewer }}
      >
        {page}
      </AppLayout>
    );
  },
);

export default ErrorPage;
