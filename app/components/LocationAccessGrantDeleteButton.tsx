import type { FC } from "react";

import DeleteButton from "./DeleteButton";
import type { DeleteButtonProps } from "./DeleteButton";

import { DeleteLocationAccessGrantMutationDocument } from "~/helpers/graphql";

export type LocationAccessGrantDeleteActionIconProps = Omit<
  DeleteButtonProps,
  "onConfirm" | "children"
> & {
  readonly grantId: string;
  readonly onDelete: () => void;
};

const LocationAccessGrantDeleteButton: FC<
  LocationAccessGrantDeleteActionIconProps
> = ({ grantId, onDelete, ...otherProps }) => {
  // == Deleting grant
  const onDeleteGrantError = useApolloAlertCallback(
    "Failed to delete location access grant",
  );
  const [deleteGrant, { loading: deletingGrant }] = useMutation(
    DeleteLocationAccessGrantMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Location access grant deleted successfully.",
        });
        onDelete();
      },
      onError: onDeleteGrantError,
    },
  );

  return (
    <DeleteButton
      loading={deletingGrant}
      onConfirm={() => {
        deleteGrant({
          variables: {
            input: {
              grantId,
            },
          },
        });
      }}
      {...otherProps}
    >
      Delete grant
    </DeleteButton>
  );
};

export default LocationAccessGrantDeleteButton;
