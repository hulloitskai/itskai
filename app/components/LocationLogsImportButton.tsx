import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import { ImportLocationLogsMutationDocument } from "~/helpers/graphql";

export type LocationImportLogsButtonProps = Omit<ButtonProps, "onClick">;

const LocationLogsImportButton: FC<LocationImportLogsButtonProps> = ({
  children,
  ...otherProps
}) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to import location logs");
  const [runMutation, { loading }] = useMutation(
    ImportLocationLogsMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Location logs imported successfully.",
        });
      },
      onError,
    },
  );

  // == Markup
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
      {children ?? "Import location logs"}
    </Button>
  );
};

export default LocationLogsImportButton;
