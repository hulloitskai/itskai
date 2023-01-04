import type { FC } from "react";

import { ObsidianNoteSynchronizeMutationDocument } from "~/queries";

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
  const onError = useApolloErrorCallback("Failed to request synchronization");
  const [runMutation, { loading }] = useMutation(
    ObsidianNoteSynchronizeMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Synchronization requested successfully",
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
  const onError = useApolloErrorCallback(
    "Failed to request re-synchronization",
  );
  const [runMutation, { loading }] = useMutation(
    ObsidianNoteSynchronizeMutationDocument,
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
