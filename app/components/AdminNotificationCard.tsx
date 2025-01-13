import { Avatar, type CardProps, Text } from "@mantine/core";
import { type ReactNode } from "react";

import { type Noticeable, type Notification } from "~/types";

import AdminNotificationActionButton, {
  type AdminNotificationActionButtonProps,
} from "./AdminNotificationActionButton";

export interface AdminNotificationCardProps
  extends CardProps,
    Pick<AdminNotificationActionButtonProps, "notification"> {}

const AdminNotificationCard: FC<AdminNotificationCardProps> = ({
  notification,
  className,
  ...otherProps
}) => (
  <Card
    withBorder
    className={cn("AdminNotificationCard", className)}
    {...otherProps}
  >
    <Group gap="xs" align="start">
      <AdminNotificationCardImage noticeable={notification.noticeable} />
      <Stack align="start" gap={8} miw={0} style={{ flexGrow: 1 }}>
        <Stack gap={1} style={{ alignSelf: "stretch" }}>
          <Text size="sm" fw={500} lh="xs" style={{ flexGrow: 1 }}>
            {notification.title}
          </Text>
          <Text c="dimmed" lh="xs">
            <AdminNotificationCardBody {...{ notification }} />
          </Text>
        </Stack>
        <AdminNotificationActionButton
          {...{ notification }}
          actionUrl={notification.action_url}
        />
      </Stack>
    </Group>
  </Card>
);

export default AdminNotificationCard;

interface AdminNotificationCardImageProps {
  noticeable: Noticeable;
}

const AdminNotificationCardImage: FC<AdminNotificationCardImageProps> = ({
  noticeable,
}) => {
  switch (noticeable?.type) {
    case "ExplorationComment":
      return (
        <Avatar>
          <ExplorationCommentIcon />
        </Avatar>
      );
    default:
      return (
        <Avatar>
          <NotificationIcon />
        </Avatar>
      );
  }
};

interface AdminNotificationCardBodyProps {
  notification: Notification;
}

const AdminNotificationCardBody: FC<AdminNotificationCardBodyProps> = ({
  notification,
}): ReactNode => {
  const { noticeable } = notification;
  switch (noticeable.type) {
    case "LocationAccess": {
      const { access } = noticeable;
      return (
        <>
          {access.accessor} (pw: {access.password}) accessed your location on{" "}
          <Time format={DateTime.DATETIME_SHORT}>{access.timestamp}</Time>
        </>
      );
    }
    default:
      return notification.body;
  }
};
