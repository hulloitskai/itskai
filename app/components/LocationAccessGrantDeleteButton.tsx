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
  // == Mutation
  const onError = useApolloAlertCallback("Failed to delete journal entries");
  const [runMutation, { loading }] = useMutation(
    DeleteLocationAccessGrantMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Journal entries deleteed successfully.",
        });
        onDelete();
      },
      onError,
    },
  );

  // == Markup
  return (
    <DeleteButton
      onConfirm={() => {
        runMutation({
          variables: {
            input: {
              grantId,
            },
          },
        });
      }}
      {...{ loading }}
      {...otherProps}
    >
      Delete grant
    </DeleteButton>
  );
};

export default LocationAccessGrantDeleteButton;
