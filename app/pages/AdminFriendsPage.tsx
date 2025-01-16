import AdminFriendForm from "~/components/AdminFriendForm";
import AdminSidebar from "~/components/AdminSidebar";
import AppLayout from "~/components/AppLayout";
import { isTodayIsh } from "~/helpers/time";
import { type AdminFriend, type FriendVibecheck } from "~/types";

import classes from "./AdminFriendsPage.module.css";

export interface AdminFriendsPageProps extends SharedPageProps {
  friends: AdminFriend[];
}

const AdminFriendsPage: PageComponent<AdminFriendsPageProps> = ({
  friends,
}) => (
  <Stack gap="sm">
    <Title order={1} size="h2" ta="center">
      Friends
    </Title>
    <AdminFriendForm
      onFriendCreated={() => {
        router.reload({ only: ["friends"] });
      }}
    />
    {!isEmpty(friends) ? (
      <List
        listStyleType="none"
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            gap: rem(6),
          },
          item: {
            display: "flex",
            flexDirection: "column",
          },
          itemWrapper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          },
        }}
      >
        {friends.map(friend => (
          <List.Item key={friend.token}>
            <Group align="center" justify="space-between">
              <Group gap={8}>
                <Badge
                  variant="light"
                  size="lg"
                  leftSection={friend.emoji}
                  style={{ flexShrink: 1 }}
                  className={classes.friendBadge}
                >
                  {friend.name}
                </Badge>
                {friend.latest_vibecheck && (
                  <LatestVibecheck
                    vibecheck={friend.latest_vibecheck}
                    style={{ flexShrink: 0 }}
                  />
                )}
              </Group>
              <Group
                gap={8}
                justify="end"
                style={{ rowGap: 0, flexShrink: 0 }}
                lh="xs"
              >
                <Anchor
                  href={routes.friends.show.path({
                    query: { friend_token: friend.token },
                  })}
                  inherit
                  fz="xs"
                >
                  Installer
                </Anchor>
                <Anchor
                  href={routes.friends.show.path({
                    query: {
                      friend_token: friend.token,
                      emulate_standalone: true,
                    },
                  })}
                  inherit
                  fz="xs"
                >
                  Emulator
                </Anchor>
              </Group>
            </Group>
          </List.Item>
        ))}
      </List>
    ) : (
      <EmptyCard itemLabel="friends" />
    )}
  </Stack>
);

AdminFriendsPage.layout = page => (
  <AppLayout
    title={["Admin", "Friends"]}
    breadcrumbs={[
      { title: "Home", href: routes.home.show.path() },
      { title: "Admin", href: routes.admin.show.path() },
      {
        title: "Friends",
        href: routes.adminFriends.index.path(),
      },
    ]}
    withContainer
    containerSize="xs"
    withGutter
    sidebar={<AdminSidebar />}
  >
    {page}
  </AppLayout>
);

export default AdminFriendsPage;

interface LatestVibecheckProps extends BoxProps {
  vibecheck: FriendVibecheck;
}

const LatestVibecheck: React.FC<LatestVibecheckProps> = ({
  vibecheck,
  ...otherProps
}) => {
  const createdAt = useMemo(
    () => DateTime.fromISO(vibecheck.created_at).toLocal(),
    [vibecheck],
  );
  const createdTodayIsh = useMemo(() => isTodayIsh(createdAt), [createdAt]);
  return createdTodayIsh ? (
    <Group justify="center" gap={4} {...otherProps}>
      {vibecheck.vibe}
      <Time
        inherit
        display="block"
        format={DateTime.TIME_SIMPLE}
        fz="xs"
        c="dimmed"
        fw={600}
        style={{ verticalAlign: "middle" }}
      >
        {createdAt}
      </Time>
    </Group>
  ) : null;
};
