import { Pagination } from "@mantine/core";

import AdminSidebar from "~/components/AdminSidebar";
import AdminStatusCard from "~/components/AdminStatusCard";
import AdminStatusForm from "~/components/AdminStatusForm";
import AppLayout from "~/components/AppLayout";
import { type Status } from "~/types";

export interface AdminStatusesPageProps extends SharedPageProps {
  statuses: Status[];
  pagination: { page: number; last: number; limit?: number };
}

const AdminStatusesPage: PageComponent<AdminStatusesPageProps> = ({
  statuses,
  pagination,
}) => (
  <Stack gap="sm">
    <Title order={1} size="h2" ta="center">
      Statuses
    </Title>
    <AdminStatusForm
      onStatusCreated={() => {
        router.reload({ only: ["statuses", "pagination"] });
      }}
    />
    {!isEmpty(statuses) ? (
      <>
        {statuses.map(status => (
          <AdminStatusCard
            key={status.id}
            status={status}
            onStatusDeleted={() => {
              router.reload({ only: ["statuses", "pagination"] });
            }}
          />
        ))}
      </>
    ) : (
      <EmptyCard itemLabel="statuses" />
    )}
    {(pagination.last ?? 1) > 1 && (
      <Pagination
        value={pagination.page}
        total={pagination.last}
        getItemProps={page => ({
          component: Link,
          href: routes.adminExplorationComments.index.path({
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
            href: routes.adminExplorationComments.index.path({
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

AdminStatusesPage.layout = page => (
  <AppLayout
    title={["Admin", "Statuses"]}
    manifestUrl="/admin-statuses.webmanifest"
    breadcrumbs={[
      { title: "Home", href: routes.home.show.path() },
      { title: "Admin", href: routes.admin.show.path() },
      {
        title: "Statuses",
        href: routes.adminStatuses.index.path(),
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

export default AdminStatusesPage;
