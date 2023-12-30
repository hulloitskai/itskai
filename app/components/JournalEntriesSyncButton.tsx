import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import { SyncJournalEntriesMutationDocument } from "~/helpers/graphql";

export type JournalEntriesSyncButtonProps = Omit<ButtonProps, "onClick">;

const JournalEntriesSyncButton: FC<JournalEntriesSyncButtonProps> = ({
  children,
  ...otherProps
}) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to sync journal entries");
  const [runMutation, { loading }] = useMutation(
    SyncJournalEntriesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Journal entries synced successfully.",
        });
      },
      onError,
    },
  );

  return (
    <Button
      variant="default"
      leftSection={<DownloadIcon />}
      onClick={() => {
        runMutation({
          variables: {
            input: {},
          },
        });
      }}
      {...{ loading }}
      {...otherProps}
    >
      {children ?? "Sync journal entries"}
    </Button>
  );
};

export default JournalEntriesSyncButton;
