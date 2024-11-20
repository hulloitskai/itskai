import { Avatar, type CardProps, Text } from "@mantine/core";

import { type Noticeable } from "~/types";

import NotificationActionButton, {
  type NotificationActionButtonProps,
} from "./NotificationActionButton";

export interface NotificationCardProps
  extends CardProps,
    Pick<NotificationActionButtonProps, "notification"> {}

const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  className,
  ...otherProps
}) => (
  <Card
    withBorder
    className={cn("NotificationCard-root", className)}
    {...otherProps}
  >
    <Group gap="xs" align="start">
      <NotificationCardImage noticeable={notification.noticeable} />
      <Stack align="start" gap={8} miw={0} style={{ flexGrow: 1 }}>
        <Stack gap={1} style={{ alignSelf: "stretch" }}>
          <Text size="sm" fw={500} lh="xs" style={{ flexGrow: 1 }}>
            {notification.title}
          </Text>
          <Text c="dimmed" lh="xs">
            {notification.body}
          </Text>
        </Stack>
        <NotificationActionButton
          {...{ notification }}
          actionUrl={notification.action_url}
        />
      </Stack>
    </Group>
  </Card>
);

export default NotificationCard;

interface NotificationCardImageProps {
  noticeable: Noticeable;
}

const NotificationCardImage: FC<NotificationCardImageProps> = ({
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
