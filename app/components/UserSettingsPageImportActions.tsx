import type { FC } from "react";

import {
  ImportJournalEntriesMutationDocument,
  ImportObsidianNotesMutationDocument,
} from "~/helpers/graphql";

export type UserSettingsPageImportActionsProps = {};

const UserSettingsPageImportActions: FC<
  UserSettingsPageImportActionsProps
> = () => (
  <Stack spacing={6}>
    <ImportObsidianNotesButton />
    <ImportJournalEntriesButton />
  </Stack>
);

export default UserSettingsPageImportActions;

const ImportObsidianNotesButton: FC = () => {
  // == Mutation
  const onError = useApolloAlertCallback(
    "Failed to request Obsidian notes import",
  );
  const [runMutation, { loading }] = useMutation(
    ImportObsidianNotesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Obsidian notes import requested",
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
      Import Obsidian Notes
    </Button>
  );
};

const ImportJournalEntriesButton: FC = () => {
  // == Mutation
  const onError = useApolloAlertCallback(
    "Failed to request journal entries import",
  );
  const [runMutation, { loading }] = useMutation(
    ImportJournalEntriesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Journal entries import requested",
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
