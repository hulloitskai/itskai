import {
  type ButtonProps,
  type CardProps,
  Drawer,
  InputWrapper,
  Text,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Linkify from "linkify-react";
import { filter, map } from "lodash-es";

import { useMutateRoute } from "~/helpers/fetch";
import { type AdminFriend, type Status } from "~/types";

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
            <Linkify
              options={{
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                className: cn(Anchor.classes.root, classes.statusLink),
              }}
            >
              {status.text}
            </Linkify>
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
  // == Drawer
  const drawerPosition = useMatches({
    base: "bottom" as const,
    xs: "right" as const,
  });
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure();

  // == Load friends
  const { data } = useFetchRoute<{ friends: AdminFriend[] }>(
    routes.adminFriends.index,
    {
      descriptor: "load friends",
      params: drawerOpened ? {} : null,
      isVisible: () => drawerOpened,
    },
  );
  const { friends } = data ?? {};
  const allNotifiableFriendIds = useMemo(() => {
    if (friends) {
      return map(filter(friends, "notifiable"), "id");
    }
  }, [friends]);

  // == Form
  const initialValues = useMemo(
    () => ({ friend_ids: allNotifiableFriendIds ?? [] }),
    [allNotifiableFriendIds],
  );
  const {
    submit,
    submitting,
    getInputProps,
    setFieldValue,
    values,
    errors,
    isTouched,
    setInitialValues,
    reset,
  } = useFetchForm({
    action: routes.adminStatuses.notifyFriends,
    params: { id: statusId },
    descriptor: "notify friends",
    initialValues,
    onSuccess: () => {
      closeDrawer();
      toast.success("Your friends were notified!");
    },
  });
  useDidUpdate(
    () => {
      if (!isTouched()) {
        setInitialValues(initialValues);
        reset();
      }
    },
    [initialValues], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const allNotifiableFriendsSelected = useMemo(() => {
    if (allNotifiableFriendIds) {
      return isEqual(allNotifiableFriendIds, values.friend_ids);
    }
  }, [allNotifiableFriendIds, values.friend_ids]);

  return (
    <>
      <Button
        leftSection={<NotificationIcon />}
        variant="default"
        size="compact-sm"
        classNames={{ section: classes.buttonSection }}
        onClick={openDrawer}
        {...otherProps}
      >
        Notify
      </Button>
      <Drawer
        title="Notify friends"
        position={drawerPosition}
        opened={drawerOpened}
        onClose={closeDrawer}
      >
        <form onSubmit={submit}>
          <Stack gap="sm">
            <InputWrapper error={errors.friend_ids}>
              {friends && allNotifiableFriendIds ? (
                <Stack gap={6} align="center">
                  <Chip.Group {...getInputProps("friend_ids")} multiple>
                    <Group wrap="wrap" gap={6} justify="center">
                      {friends.map(friend => (
                        <Tooltip
                          key={friend.id}
                          withArrow
                          label="This friend has not subscribed to push notifications"
                          disabled={friend.notifiable}
                        >
                          <div>
                            <Chip
                              variant="outline"
                              value={friend.id}
                              disabled={!friend.notifiable}
                            >
                              <span style={{ marginRight: rem(2) }}>
                                {friend.emoji}
                              </span>{" "}
                              {friend.name}
                            </Chip>
                          </div>
                        </Tooltip>
                      ))}
                    </Group>
                  </Chip.Group>
                  <Anchor
                    component="button"
                    type="button"
                    size="sm"
                    onClick={() => {
                      const nextIds = allNotifiableFriendsSelected
                        ? []
                        : allNotifiableFriendIds;
                      setFieldValue("friend_ids", nextIds);
                    }}
                  >
                    {allNotifiableFriendsSelected
                      ? "Unselect all"
                      : "Select all"}
                  </Anchor>
                </Stack>
              ) : (
                <Skeleton h={54} />
              )}
            </InputWrapper>
            <Button
              type="submit"
              leftSection={<NotificationIcon />}
              loading={submitting}
              disabled={isEmpty(values.friend_ids)}
            >
              Notify
            </Button>
          </Stack>
        </form>
      </Drawer>
    </>
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
      size="compact-sm"
      loading={mutating}
      classNames={{ section: classes.buttonSection }}
      onConfirm={() => {
        void trigger();
      }}
      {...otherProps}
    />
  );
};
