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
  const { submitting, submit } = useFetchForm({
    action: routes.adminLocationAccessGrants.destroy,
    params: { id: grantId },
    descriptor: "delete grant",
    onSuccess: () => {
      onGrantDeleted?.();
    },
  });
  return (
    <DeleteButton
      loading={submitting}
      onConfirm={() => {
        submit();
      }}
      {...otherProps}
    />
  );
};

export default AdminLocationAccessGrantDeleteButton;
