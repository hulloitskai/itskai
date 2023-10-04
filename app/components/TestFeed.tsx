import type { FC } from "react";
import { Code, LoadingOverlay } from "@mantine/core";

import { TestFeedSubscriptionDocument } from "~/helpers/graphql";

const TestFeed: FC = () => {
  // == Subscription
  const onError = useApolloAlertCallback("Failed to subscribe to updates");
  const { data, loading } = useSubscription(TestFeedSubscriptionDocument, {
    variables: {},
    onData: ({ data: { error } }) => {
      if (error) {
        console.error("Error during update", formatJSON({ error }));
      }
    },
    onError,
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
