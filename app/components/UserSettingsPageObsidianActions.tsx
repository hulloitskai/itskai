import type { FC } from "react";

import { SyncAllObsidianNotesMutationDocument } from "~/helpers/graphql";

export type UserSettingsPageObsidianActionsProps = {};

const UserSettingsPageObsidianActions: FC<
  UserSettingsPageObsidianActionsProps
> = () => (
  <Stack spacing={6}>
    <SynchronizeUpdatedButton />
    <ResynchronizeAllButton />
  </Stack>
);

const SynchronizeUpdatedButton: FC = () => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to request synchronization");
  const [runMutation, { loading }] = useMutation(
    SyncAllObsidianNotesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Synchronization requested successfully",
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
      Synchronize Updated
    </Button>
  );
};

const ResynchronizeAllButton: FC = () => {
  const onError = useApolloAlertCallback(
    "Failed to request re-synchronization",
  );
  const [runMutation, { loading }] = useMutation(
    SyncAllObsidianNotesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Re-synchronization requested successfully",
        });
      },
      onError,
    },
  );
  return (
    <Button
      variant="default"
      onClick={() => {
        runMutation({
          variables: {
            input: {
              force: true,
            },
          },
        });
      }}
      {...{ loading }}
    >
      Re-synchronize All
    </Button>
  );
};

export default UserSettingsPageObsidianActions;
