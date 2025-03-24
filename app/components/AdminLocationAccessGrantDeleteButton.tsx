import { type DeleteButtonProps } from "./DeleteButton";
import DeleteButton from "./DeleteButton";

export interface AdminLocationAccessGrantDeleteButtonProps
  extends Omit<DeleteButtonProps, "onConfirm" | "children"> {
  grantId: string;
}

const AdminLocationAccessGrantDeleteButton: FC<
  AdminLocationAccessGrantDeleteButtonProps
> = ({ grantId, ...otherProps }) => {
  const { submitting, submit } = useForm({
    action: routes.adminLocationAccessGrants.destroy,
    params: { id: grantId },
    descriptor: "delete grant",
    onSuccess: () => {
      void mutateRoute(routes.adminLocationAccessGrants.index);
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
