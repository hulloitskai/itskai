import AdminFriendForm from "~/components/AdminFriendForm";
import AdminSidebar from "~/components/AdminSidebar";
import AppLayout from "~/components/AppLayout";
import { type AdminFriend } from "~/types";

import classes from "./AdminFriendsPage.module.css";

export interface AdminFriendsPageProps extends SharedPageProps {
  friends: AdminFriend[];
}

const AdminFriendsPage: PageComponent<AdminFriendsPageProps> = ({
  friends,
}) => {
  return (
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
        <Group wrap="wrap" gap="xs">
          {friends.map(friend => (
            <Badge
              component={Link}
              variant="default"
              size="lg"
              href={routes.friends.show.path({
                query: { friend_token: friend.token },
              })}
              leftSection={friend.emoji}
              className={classes.friendBadge}
            >
              {friend.name}
            </Badge>
          ))}
        </Group>
      ) : (
        <EmptyCard itemLabel="friends" />
      )}
    </Stack>
  );
};

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
