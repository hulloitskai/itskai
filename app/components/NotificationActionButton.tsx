import { type ButtonProps } from "@mantine/core";

import GoIcon from "~icons/heroicons/arrow-right-circle-20-solid";

import { type Notification } from "~/types";

export interface NotificationActionButtonProps
  extends Pick<NotificationActionButtonBaseProps, "actionUrl"> {
  notification: Notification;
}

const NotificationActionButton: FC<NotificationActionButtonProps> = ({
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
    <NotificationActionButtonBase {...otherProps}>
      {label}
    </NotificationActionButtonBase>
  );
};

interface NotificationActionButtonBaseProps
  extends ButtonProps,
    Omit<
      ComponentPropsWithoutRef<typeof Link>,
      "href" | "color" | "size" | "style"
    > {
  actionUrl: string | null;
}

const NotificationActionButtonBase: FC<NotificationActionButtonBaseProps> = ({
  actionUrl,
  children,
  ...otherProps
}) => (
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

export default NotificationActionButton;
