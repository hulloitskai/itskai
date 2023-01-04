import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import ObsidianGraph from "./ObsidianGraph";

import { HomePageGraphQueryDocument } from "~/queries";

export type HomePageGraphProps = BoxProps;

const HomePageGraph: FC<HomePageGraphProps> = ({ ...otherProps }) => {
  // == Query
  const oneWeekAgo = useMemo(() => {
    return DateTime.now()
      .minus(Duration.fromObject({ weeks: 1 }))
      .toISO();
  }, []);
  const onError = useApolloErrorCallback("Failed to load Obsidian entries");
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
