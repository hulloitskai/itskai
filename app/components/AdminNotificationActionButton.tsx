import { type ButtonProps } from "@mantine/core";

import GoIcon from "~icons/heroicons/arrow-right-circle-20-solid";

import { type Notification } from "~/types";

export interface AdminNotificationActionButtonProps
  extends Pick<AdminNotificationActionButtonBaseProps, "actionUrl"> {
  notification: Notification;
}

const AdminNotificationActionButton: FC<AdminNotificationActionButtonProps> = ({
  notification,
  ...otherProps
}) => {
  let label: string | undefined;
  const { noticeable } = notification;
  switch (noticeable.type) {
    case "ExplorationComment":
      label = "Go to comments";
      break;
  }
  return (
    <AdminNotificationActionButtonBase {...otherProps}>
      {label}
    </AdminNotificationActionButtonBase>
  );
};

interface AdminNotificationActionButtonBaseProps
  extends ButtonProps,
    Omit<
      ComponentPropsWithoutRef<typeof Link>,
      "href" | "color" | "size" | "style"
    > {
  actionUrl: string | null;
}

const AdminNotificationActionButtonBase: FC<
  AdminNotificationActionButtonBaseProps
> = ({ actionUrl, children, ...otherProps }) => (
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

export default AdminNotificationActionButton;
