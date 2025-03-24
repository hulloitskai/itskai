import {
  type ButtonProps,
  type CardProps,
  Drawer,
  Image,
  InputWrapper,
  Text,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Linkify from "linkify-react";
import { filter, map } from "lodash-es";

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
            style={{ textTransform: "lowercase" }}
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
            <Text w={22} ta="end" display="block">
              {status.emoji}
            </Text>
          )}
          <Text
            lh="md"
            style={{ whiteSpace: "pre-line", whiteSpaceCollapse: "preserve" }}
          >
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
      {status.image && (
        <Card.Section withBorder className={classes.imageSection}>
          <Image
            srcSet={status.image.src_set}
            src={status.image.src}
            mah={200}
            fit="contain"
          />
        </Card.Section>
      )}
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
  className,
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
  const { data } = useRouteSWR<{ friends: AdminFriend[] }>(
    routes.adminFriends.index,
    {
      descriptor: "load friends",
      params: drawerOpened ? {} : null,
      isVisible: () => drawerOpened,
    },
  );
  const { friends } = data ?? {};
  const notifiableFriends = useMemo(() => {
    if (friends) {
      return filter(friends, "notifiable");
    }
  }, [friends]);
  const notifiableFriendIds = useMemo(() => {
    if (notifiableFriends) {
      return map(notifiableFriends, "id");
    }
  }, [notifiableFriends]);

  // == Form
  const initialValues = useMemo(
    () => ({ friend_ids: notifiableFriendIds ?? [] }),
    [notifiableFriendIds],
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
  } = useForm({
    action: routes.adminStatuses.notifyFriends,
    params: { id: statusId },
    descriptor: "notify friends",
    initialValues,
    onSuccess: () => {
      closeDrawer();
      toast.success("your friends were notified!");
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
    if (notifiableFriendIds) {
      return isEqual(notifiableFriendIds, values.friend_ids);
    }
  }, [notifiableFriendIds, values.friend_ids]);

  return (
    <>
      <Button
        className={cn(classes.button, className)}
        leftSection={<NotificationIcon />}
        variant="default"
        size="compact-sm"
        onClick={openDrawer}
        {...otherProps}
      >
        notify
      </Button>
      <Drawer
        classNames={{ content: classes.notifyFriendsDrawerContent }}
        title="notify friends"
        position={drawerPosition}
        opened={drawerOpened}
        onClose={closeDrawer}
      >
        <form onSubmit={submit}>
          <Stack gap="sm">
            <InputWrapper error={errors.friend_ids}>
              {notifiableFriends && notifiableFriendIds ? (
                <Stack gap={6} align="center">
                  <Chip.Group {...getInputProps("friend_ids")} multiple>
                    <Group wrap="wrap" gap={6} justify="center">
                      {notifiableFriends.map(friend => (
                        <Tooltip
                          key={friend.id}
                          label="this friend has not subscribed to push notifications"
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
                        : notifiableFriendIds;
                      setFieldValue("friend_ids", nextIds);
                    }}
                  >
                    {allNotifiableFriendsSelected
                      ? "unselect all"
                      : "select all"}
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
              notify
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
  className,
  ...otherProps
}) => {
  const { trigger, mutating } = useRouteMutation(routes.adminStatuses.destroy, {
    params: { id: statusId },
    descriptor: "delete status",
    onSuccess: () => {
      onStatusDeleted();
    },
  });
  return (
    <DeleteButton
      className={cn(classes.button, className)}
      size="compact-sm"
      loading={mutating}
      onConfirm={() => {
        void trigger();
      }}
      {...otherProps}
    />
  );
};
