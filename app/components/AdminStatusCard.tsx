import { type ButtonProps, type CardProps, Text } from "@mantine/core";

import { useMutateRoute } from "~/helpers/fetch";
import { type Status } from "~/types";

import DeleteButton, { type DeleteButtonProps } from "./DeleteButton";

import classes from "./AdminStatusCard.module.css";

export interface AdminStatusCardProps
  extends CardProps,
    Pick<DeleteStatusButtonProps, "onStatusDeleted"> {
  status: Status;
}

const AdminStatusCard: FC<AdminStatusCardProps> = ({
  status,
  onStatusDeleted,
  ...otherProps
}) => {
  return (
    <Card withBorder {...otherProps}>
      <Card.Section withBorder inheritPadding pr="xs" py="xs">
        <Group justify="space-between" gap="xs">
          <Time
            format={DateTime.DATETIME_MED}
            size="xs"
            c="dimmed"
            display="block"
          >
            {status.created_at}
          </Time>
          <Group gap={6}>
            <NotifyFriendsButton statusId={status.id} />
            <DeleteStatusButton statusId={status.id} {...{ onStatusDeleted }} />
          </Group>
        </Group>
      </Card.Section>
      <Card.Section withBorder p="xs">
        <Group align="start" gap="xs">
          {!!status.emoji && (
            <Text w={22} ta="end" display="block" lh="xs">
              {status.emoji}
            </Text>
          )}
          <Text lh="xs" style={{ whiteSpace: "pre-line" }}>
            {status.text}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default AdminStatusCard;

interface NotifyFriendsButtonProps
  extends Omit<ButtonProps, "loading" | "onClick"> {
  statusId: string;
}

const NotifyFriendsButton: FC<NotifyFriendsButtonProps> = ({
  statusId,
  ...otherProps
}) => {
  const { trigger, mutating } = useMutateRoute(
    routes.adminStatuses.notifyFriends,
    {
      params: { id: statusId },
      descriptor: "notify friends",
      onSuccess: () => {
        toast.success("Your friends were notified!");
      },
    },
  );
  return (
    <Button
      leftSection={<NotificationIcon />}
      variant="default"
      size="compact-sm"
      loading={mutating}
      classNames={{ section: classes.buttonSection }}
      onClick={() => {
        void trigger();
      }}
      {...otherProps}
    >
      Notify
    </Button>
  );
};

interface DeleteStatusButtonProps
  extends Omit<DeleteButtonProps, "loading" | "onConfirm"> {
  statusId: string;
  onStatusDeleted: () => void;
}

const DeleteStatusButton: FC<DeleteStatusButtonProps> = ({
  statusId,
  onStatusDeleted,
  ...otherProps
}) => {
  const { trigger, mutating } = useMutateRoute(routes.adminStatuses.destroy, {
    params: { id: statusId },
    descriptor: "delete status",
    onSuccess: () => {
      onStatusDeleted();
    },
  });
  return (
    <DeleteButton
      size="compact-xs"
      loading={mutating}
      classNames={{ section: classes.buttonSection }}
      onConfirm={() => {
        void trigger();
      }}
      {...otherProps}
    />
  );
};
