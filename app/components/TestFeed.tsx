import type { FC } from "react";
import { Code, LoadingOverlay } from "@mantine/core";

import { TestFeedSubscriptionDocument } from "~/helpers/graphql";

const TestFeed: FC = () => {
  const { data, loading } = useSubscription(TestFeedSubscriptionDocument, {
    variables: {},
    onError: error => {
      console.error("Error during update", formatJSON({ error }));
    },
  });
  const { testSubscription: value } = data ?? {};
  return (
    <Stack gap="xs">
      <Title order={4}>Test Feed</Title>
      <Box style={{ position: "relative" }}>
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
