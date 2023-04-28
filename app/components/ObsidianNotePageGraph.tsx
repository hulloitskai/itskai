import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { ObsidianNotePageGraphQueryDocument } from "~/queries";

export type ObsidianNotePageGraphProps = BoxProps & {
  readonly noteId: string;
};

const ObsidianGraph = lazy(() => import("./ObsidianGraph"));

const ObsidianNotePageGraph: FC<ObsidianNotePageGraphProps> = ({
  noteId,
  ...otherProps
}) => {
  const onError = useApolloAlertCallback(
    "Failed to load related Obsidian entries",
  );
  const { data, loading } = useQuery(ObsidianNotePageGraphQueryDocument, {
    variables: { noteId },
    onError,
  });
  const entries = useMemo(() => {
    const { note } = data ?? {};
    if (note) {
      const { references, referencedBy } = note;
      const entries = uniqBy(
        [note, ...references, ...referencedBy],
        ({ id }) => id,
      );
      return take(entries, 60);
    }
  }, [data]);
  const entryCount = entries?.length ?? 0;
  return (
    <ObsidianGraph
      h={
        entryCount < 8
          ? 280
          : entryCount < 12
          ? 320
          : entryCount < 22
          ? 380
          : 540
      }
      {...{ entries, loading }}
      {...otherProps}
    />
  );
};

export default ObsidianNotePageGraph;
