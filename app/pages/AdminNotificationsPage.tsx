import { Pagination } from "@mantine/core";

import AdminSidebar from "~/components/AdminSidebar";
import AppLayout from "~/components/AppLayout";
import NotificationCard from "~/components/NotificationCard";
import { type Notification } from "~/types";

export interface AdminNotificationsPageProps extends SharedPageProps {
  notifications: Notification[];
  pagination: { page: number; last: number; limit?: number };
}

const AdminNotificationsPage: PageComponent<AdminNotificationsPageProps> = ({
  notifications,
  pagination,
}) => {
  return (
    <Stack gap="sm">
      <Title order={2} size="h2" ta="center">
        Notifications
      </Title>
      {!isEmpty(notifications) ? (
        <>
          {notifications.map(notification => (
            <NotificationCard key={notification.id} {...{ notification }} />
          ))}
        </>
      ) : (
        <EmptyCard itemLabel="notifications" />
      )}
      {(pagination.last ?? 1) > 1 && (
        <Pagination
          value={pagination.page}
          total={pagination.last}
          getItemProps={page => ({
            component: Link,
            href: routes.adminNotifications.index.path({
              query: {
                limit: pagination.limit,
                page: page > 1 ? page : null,
              },
            }),
          })}
          getControlProps={control => {
            const nextPage = {
              first: 1,
              last: pagination.last,
              next: pagination.page + 1,
              previous: pagination.page - 1,
            }[control];
            return {
              component: Link,
              href: routes.adminNotifications.index.path({
                query: {
                  limit: pagination.limit,
                  page: nextPage > 1 ? nextPage : null,
                },
              }),
            };
          }}
          style={{ alignSelf: "center" }}
        />
      )}
    </Stack>
  );
};

AdminNotificationsPage.layout = page => (
  <AppLayout
    title={["Admin", "Notifications"]}
    breadcrumbs={[
      { title: "Home", href: routes.home.show.path() },
      { title: "Admin", href: routes.admin.show.path() },
      {
        title: "Notifications",
        href: routes.adminNotifications.index.path(),
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

export default AdminNotificationsPage;
