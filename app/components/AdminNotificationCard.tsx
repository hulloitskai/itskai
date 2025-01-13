import { Avatar, type CardProps, Text } from "@mantine/core";

import ClockIcon from "~icons/heroicons/clock-20-solid";

import { type Noticeable } from "~/types";

import AdminNotificationActionButton, {
  type AdminNotificationActionButtonProps,
} from "./AdminNotificationActionButton";

import classes from "./AdminNotificationCard.module.css";

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
        <Stack style={{ alignSelf: "stretch" }} className={classes.body}>
          <Group gap="xs" className={classes.header}>
            <Text
              size="sm"
              fw={600}
              lh={1.2}
              miw={0}
              style={{ flexGrow: 1 }}
              className={classes.title}
            >
              {notification.title}
            </Text>
            <Group
              gap={6}
              style={{ flexShrink: 0 }}
              className={classes.timestamp}
            >
              <Box component={ClockIcon} fz="xs" />
              <Time
                format={DateTime.DATETIME_MED}
                size="sm"
                display="block"
                inline
              >
                {notification.timestamp}
              </Time>
            </Group>
          </Group>
          <Text c="dimmed" lh={1.2}>
            {notification.body}
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
    case "FriendVibecheck":
      return (
        <Avatar>
          <FriendsIcon />
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
