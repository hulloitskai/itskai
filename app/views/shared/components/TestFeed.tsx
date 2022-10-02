import React, { FC } from "react";
import { Code, LoadingOverlay } from "@mantine/core";

import { TestFeedSubscriptionDocument } from "~views/shared/helpers/apollo-generated";

const TestFeed: FC = () => {
  const { data, loading } = useSubscription(TestFeedSubscriptionDocument, {
    variables: {},
  });
  const { testSubscription: value } = data ?? {};
  console.log(value);
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
