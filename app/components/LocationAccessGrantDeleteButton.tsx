import type { FC } from "react";

import type { DeleteButtonProps } from "./DeleteButton";
import DeleteButton from "./DeleteButton";

export interface LocationAccessGrantDeleteButtonProps
  extends Omit<DeleteButtonProps, "onConfirm" | "children"> {
  grantId: string;
  onDeleted?: () => void;
}

const LocationAccessGrantDeleteButton: FC<
  LocationAccessGrantDeleteButtonProps
> = ({ grantId, onDeleted, ...otherProps }) => {
  const { submit, processing } = useFetchForm({
    action: routes.adminLocationAccessGrants.destroy,
    params: { id: grantId },
    method: "delete",
    descriptor: "delete grant",
    onSuccess: () => {
      onDeleted?.();
    },
  });
  return (
    <DeleteButton
      loading={processing}
      onConfirm={() => {
        submit();
      }}
      {...otherProps}
    >
      Delete grant
    </DeleteButton>
  );
};

export default LocationAccessGrantDeleteButton;
