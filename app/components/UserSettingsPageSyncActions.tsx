import type { FC } from "react";

import {
  ImportJournalEntriesMutationDocument,
  ImportLocationLogsMutationDocument,
} from "~/helpers/graphql";

export type UserSettingsPageImportActionsProps = {};

const UserSettingsPageImportActions: FC<
  UserSettingsPageImportActionsProps
> = () => (
  <Stack spacing={6}>
    <ImportLocationButton />
    <ImportJournalButton />
  </Stack>
);

export default UserSettingsPageImportActions;

const ImportLocationButton: FC = () => {
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
      onClick={() => {
        runMutation({
          variables: {
            input: {},
          },
        });
      }}
      {...{ loading }}
    >
      Import Location
    </Button>
  );
};

const ImportJournalButton: FC = () => {
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
      onClick={() => {
        runMutation({
          variables: {
            input: {},
          },
        });
      }}
      {...{ loading }}
    >
      Import Journal Entries
    </Button>
  );
};
