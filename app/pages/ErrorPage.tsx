import { Code, Text } from "@mantine/core";

import BackIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import AppLayout from "~/components/AppLayout";

export interface ErrorPageProps extends SharedPageProps {
  title: string;
  description: string;
  code: number;
  error: string | null;
}

const ErrorPage: PageComponent<ErrorPageProps> = ({
  code,
  description,
  error,
  title,
}) => (
  <Stack align="center">
    <Badge
      variant="outline"
      color="red"
      styles={{ label: { textTransform: "none" } }}
    >
      status {code}
    </Badge>
    <Stack align="center" gap={2}>
      <Title size="h2">{title}</Title>
      <Text c="dimmed" ta="center">
        {description}
      </Text>
    </Stack>
    {!!error && (
      <Code block style={{ alignSelf: "stretch", textTransform: "none" }}>
        error: {error}
      </Code>
    )}
    <Button
      component={Link}
      href={routes.home.show.path()}
      leftSection={<BackIcon />}
    >
      back to home
    </Button>
  </Stack>
);

ErrorPage.layout = page => (
  <AppLayout<ErrorPageProps>
    title={({ title }) => title}
    description={({ description }) => description}
    withContainer
    containerSize="xs"
    containerProps={{ my: "xl" }}
  >
    {page}
  </AppLayout>
);

export default ErrorPage;
