import { type ButtonProps } from "@mantine/core";

import GoIcon from "~icons/heroicons/arrow-right-circle-20-solid";

import { notificationActionUrl } from "~/helpers/notifications";
import { type Notification } from "~/types";

export interface AdminNotificationActionButtonProps
  extends Omit<AdminNotificationActionButtonBaseProps, "children"> {}

const AdminNotificationActionButton: FC<
  AdminNotificationActionButtonProps
> = props => {
  switch (props.notification.type) {
    case "ExplorationComment":
      return (
        <AdminNotificationActionButtonBase {...props}>
          Go to comments
        </AdminNotificationActionButtonBase>
      );
    default:
      return null;
  }
};

interface AdminNotificationActionButtonBaseProps
  extends ButtonProps,
    Omit<
      ComponentPropsWithoutRef<typeof Link>,
      "href" | "color" | "size" | "style"
    > {
  notification: Notification;
}

const AdminNotificationActionButtonBase: FC<
  AdminNotificationActionButtonBaseProps
> = ({ notification, children, ...otherProps }) => {
  const actionUrl = useMemo(
    () => notificationActionUrl(notification),
    [notification],
  );
  return (
    <>
      {!!actionUrl && (
        <Button
          component={Link}
          href={actionUrl}
          size="compact-sm"
          variant="light"
          leftSection={<GoIcon />}
          {...otherProps}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default AdminNotificationActionButton;
