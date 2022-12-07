import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { ErrorPageQuery } from "~/queries";

export type ErrorPageProps = {
  readonly data: ErrorPageQuery;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

const ErrorPage: PageComponent<ErrorPageProps> = ({
  title,
  description,
  code,
}) => {
  return (
    <Stack align="center">
      <Badge variant="outline" color="red">
        Status {code}
      </Badge>
      <Stack align="center" spacing={2}>
        <Title size="h2">{title}</Title>
        <Text color="dark.3">{description}</Text>
      </Stack>
      <Button component={Link} href="/" mt={4}>
        Back to Home
      </Button>
    </Stack>
  );
};

ErrorPage.layout = layoutWithData<ErrorPageProps>((page, { viewer }) => (
  <AppLayout
    withContainer
    containerProps={{ size: "xs", my: "xl" }}
    {...{ viewer }}
  >
    {page}
  </AppLayout>
));

export default ErrorPage;
