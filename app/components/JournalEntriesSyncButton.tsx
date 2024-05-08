import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import { SyncJournalEntriesMutationDocument } from "~/helpers/graphql";

export type JournalEntriesSyncButtonProps = Omit<ButtonProps, "onClick">;

const JournalEntriesSyncButton: FC<JournalEntriesSyncButtonProps> = ({
  children,
  ...otherProps
}) => {
  // == Syncing Entries
  const onSyncEntriesError = useApolloAlertCallback(
    "Failed to sync journal entries",
  );
  const [syncEntries, { loading: syncingEntries }] = useMutation(
    SyncJournalEntriesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Journal entries synced successfully.",
        });
      },
      onError: onSyncEntriesError,
    },
  );

  return (
    <Button
      variant="default"
      loading={syncingEntries}
      leftSection={<DownloadIcon />}
      onClick={() => {
        syncEntries({
          variables: {
            input: {},
          },
        });
      }}
      {...otherProps}
    >
      {children ?? "Sync journal entries"}
    </Button>
  );
};

export default JournalEntriesSyncButton;
