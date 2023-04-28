import { lazy } from "react";
import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { HomePageGraphQueryDocument } from "~/queries";

export type HomePageGraphProps = BoxProps;

const ObsidianGraph = lazy(() => import("./ObsidianGraph"));

const HomePageGraph: FC<HomePageGraphProps> = ({ ...otherProps }) => {
  // == Query
  const oneWeekAgo = useMemo(() => {
    return DateTime.now()
      .minus(Duration.fromObject({ weeks: 1 }))
      .toISO();
  }, []);
  const onError = useApolloAlertCallback("Failed to load Obsidian entries");
  const { data, loading, fetchMore } = useQuery(HomePageGraphQueryDocument, {
    variables: {
      modifiedAfter: oneWeekAgo,
      first: 32,
    },
    onError,
  });
  const { edges, pageInfo } = data?.obsidianNotes ?? {};
  const { hasNextPage, endCursor } = pageInfo ?? {};
  const notes = useMemo(() => edges?.map(({ node }) => node), [edges]);

  // == Markup
  return (
    <ObsidianGraph
      entries={notes}
      hasMore={hasNextPage}
      fetchMore={() => {
        fetchMore({
          variables: {
            after: endCursor,
          },
        });
      }}
      {...{ loading }}
      {...otherProps}
    />
  );
};

export default HomePageGraph;
