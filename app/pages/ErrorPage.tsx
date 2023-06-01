import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { ErrorPageQuery } from "~/helpers/graphql";

export type ErrorPageProps = PageProps<ErrorPageQuery> & {
  readonly title: string;
  readonly description: string;
  readonly code: number;
};

const ErrorPage: PageComponent<ErrorPageProps> = ({
  title,
  description,
  code,
}) => (
  <Container size="sm" my="xl">
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
