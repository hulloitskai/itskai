import {
  type ButtonProps,
  type CardProps,
  Drawer,
  InputWrapper,
  Text,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { map } from "lodash-es";

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
  const allFriendIds = useMemo(() => {
    if (friends) {
      return map(friends, "id");
    }
  }, [friends]);

  // == Form
  const initialValues = useMemo(
    () => ({ friend_ids_to_alert: allFriendIds ?? [] }),
    [allFriendIds],
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
  const allFriendsSelected = useMemo(() => {
    if (allFriendIds) {
      return isEqual(allFriendIds, values.friend_ids_to_alert);
    }
  }, [allFriendIds, values.friend_ids_to_alert]);

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
            <InputWrapper error={errors.friend_ids_to_alert}>
              {friends && allFriendIds ? (
                <Stack gap={6} align="center">
                  <Chip.Group
                    {...getInputProps("friend_ids_to_alert")}
                    multiple
                  >
                    <Group wrap="wrap" gap={6} justify="center">
                      {friends.map(friend => (
                        <Chip
                          key={friend.id}
                          variant="outline"
                          value={friend.id}
                        >
                          <span style={{ marginRight: rem(2) }}>
                            {friend.emoji}
                          </span>{" "}
                          {friend.name}
                        </Chip>
                      ))}
                    </Group>
                  </Chip.Group>
                  <Anchor
                    component="button"
                    type="button"
                    size="sm"
                    onClick={() => {
                      const nextIds = allFriendsSelected ? [] : allFriendIds;
                      setFieldValue("friend_ids_to_alert", nextIds);
                    }}
                  >
                    {allFriendsSelected ? "Unselect all" : "Select all"}
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
              disabled={isEmpty(values.friend_ids_to_alert)}
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
