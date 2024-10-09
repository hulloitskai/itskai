import { type DeleteButtonProps } from "./DeleteButton";
import DeleteButton from "./DeleteButton";

export interface AdminLocationAccessGrantDeleteButtonProps
  extends Omit<DeleteButtonProps, "onConfirm" | "children"> {
  grantId: string;
  onGrantDeleted?: () => void;
}

const AdminLocationAccessGrantDeleteButton: FC<
  AdminLocationAccessGrantDeleteButtonProps
> = ({ grantId, onGrantDeleted, ...otherProps }) => {
  const { processing, submit } = useFetchForm({
    action: routes.adminLocationAccessGrants.destroy,
    params: { id: grantId },
    descriptor: "delete grant",
    onSuccess: () => {
      onGrantDeleted?.();
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
