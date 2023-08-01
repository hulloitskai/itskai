import type { FC } from "react";

import {
  SyncJournalEntriesMutationDocument,
  SyncLocationMutationDocument,
} from "~/helpers/graphql";

export type UserSettingsPageSyncActionsProps = {};

const UserSettingsPageSyncActions: FC<
  UserSettingsPageSyncActionsProps
> = () => (
  <Stack spacing={6}>
    <SyncLocationButton />
    <SyncJournalButton />
  </Stack>
);

export default UserSettingsPageSyncActions;

const SyncLocationButton: FC = () => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to sync location");
  const [runMutation, { loading }] = useMutation(SyncLocationMutationDocument, {
    onCompleted: () => {
      showNotice({
        message: "Location synced successfully.",
      });
    },
    onError,
  });

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
      Sync Location
    </Button>
  );
};

const SyncJournalButton: FC = () => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to sync journal");
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
      Sync Journal Entries
    </Button>
  );
};
