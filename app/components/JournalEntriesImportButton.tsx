import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import { ImportJournalEntriesMutationDocument } from "~/helpers/graphql";

export type JournalEntriesImportButtonProps = Omit<ButtonProps, "onClick">;

const JournalEntriesImportButton: FC<JournalEntriesImportButtonProps> = ({
  children,
  ...otherProps
}) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to import journal entries");
  const [runMutation, { loading }] = useMutation(
    ImportJournalEntriesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Journal entries imported successfully.",
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
      {children ?? "Import journal entries"}
    </Button>
  );
};

export default JournalEntriesImportButton;
