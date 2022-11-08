import type { FC } from "react";
import { Code, LoadingOverlay } from "@mantine/core";

import { TestFeedSubscriptionDocument } from "~/queries";

const TestFeed: FC = () => {
  const { data, loading } = useSubscription(TestFeedSubscriptionDocument, {
    variables: {},
  });
  const { testSubscription: value } = data ?? {};
  return (
    <Stack spacing="xs">
      <Title order={4}>Test Feed</Title>
      <Box sx={{ position: "relative" }}>
        <Code block>var data = {value}</Code>
        <LoadingOverlay
          loaderProps={{ size: "sm" }}
          visible={!data && loading}
        />
      </Box>
    </Stack>
  );
};

export default TestFeed;
