import { Code } from "@mantine/core";

const TestFeed: FC = () => {
  const { data } = useSubscription<{ value: number }>("TestChannel", {
    descriptor: "subscribe to test feed",
  });
  const { value } = data ?? {};

  return (
    <Stack gap="xs">
      <Title order={3}>Test feed</Title>
      <Box style={{ position: "relative" }}>
        <Code block>var data = {value ?? "undefined"};</Code>
      </Box>
    </Stack>
  );
};

export default TestFeed;
