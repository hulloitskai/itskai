import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import { SyncLocationLogsMutationDocument } from "~/helpers/graphql";

export type LocationSyncLogsButtonProps = Omit<ButtonProps, "onClick">;

const LocationLogsSyncButton: FC<LocationSyncLogsButtonProps> = ({
  children,
  ...otherProps
}) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to import location logs");
  const [runMutation, { loading }] = useMutation(
    SyncLocationLogsMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Location logs synced successfully.",
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
      {children ?? "Sync location logs"}
    </Button>
  );
};

export default LocationLogsSyncButton;
