import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import { SyncLocationLogsMutationDocument } from "~/helpers/graphql";

export type LocationSyncLogsButtonProps = Omit<ButtonProps, "onClick">;

const LocationLogsSyncButton: FC<LocationSyncLogsButtonProps> = ({
  children,
  ...otherProps
}) => {
  // == Syncing Logs
  const onSyncLogsError = useApolloAlertCallback(
    "Failed to import location logs",
  );
  const [syncLogs, { loading: syncingLogs }] = useMutation(
    SyncLocationLogsMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Location logs synced successfully.",
        });
      },
      onError: onSyncLogsError,
    },
  );

  return (
    <Button
      variant="default"
      leftSection={<DownloadIcon />}
      onClick={() => {
        syncLogs({
          variables: {
            input: {},
          },
        });
      }}
      {...{ loading: syncingLogs }}
      {...otherProps}
    >
      {children ?? "Sync location logs"}
    </Button>
  );
};

export default LocationLogsSyncButton;
