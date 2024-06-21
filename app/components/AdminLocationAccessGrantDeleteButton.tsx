import type { DeleteButtonProps } from "./DeleteButton";
import DeleteButton from "./DeleteButton";

export interface AdminLocationAccessGrantDeleteButtonProps
  extends Omit<DeleteButtonProps, "onConfirm" | "children"> {
  grantId: string;
  onDeleted?: () => void;
}

const AdminLocationAccessGrantDeleteButton: FC<
  AdminLocationAccessGrantDeleteButtonProps
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
    />
  );
};

export default AdminLocationAccessGrantDeleteButton;
