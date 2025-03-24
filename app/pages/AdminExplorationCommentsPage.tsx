import { Pagination, Text } from "@mantine/core";

import AdminSidebar from "~/components/AdminSidebar";
import AppLayout from "~/components/AppLayout";
import { type Exploration, type ExplorationComment } from "~/types";

export interface AdminExplorationCommentsPageProps extends SharedPageProps {
  explorations: Exploration[];
  comments: ExplorationComment[];
  pagination: { page: number; last: number; limit?: number };
}

const AdminExplorationCommentsPage: PageComponent<
  AdminExplorationCommentsPageProps
> = ({ explorations, comments, pagination }) => {
  const explorationsById = useMemo(
    () => keyBy(explorations, "id"),
    [explorations],
  );
  return (
    <Stack gap="sm">
      <Title order={1} size="h2" ta="center">
        exploration comments
      </Title>
      {!isEmpty(comments) ? (
        <>
          {comments.map(comment => {
            const exploration = explorationsById[comment.exploration_id];
            invariant(
              exploration,
              `exploration with ID '${comment.exploration_id}' not found`,
            );
            return (
              <Card key={comment.id} withBorder>
                <Card.Section withBorder inheritPadding py="xs">
                  <Text inherit fz="sm" fw={700}>
                    re: "{exploration.label}"
                  </Text>
                  <Time
                    format={DateTime.DATETIME_MED}
                    size="xs"
                    c="dimmed"
                    display="block"
                    style={{ textTransform: "lowercase" }}
                  >
                    {comment.created_at}
                  </Time>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                  <Text
                    inherit
                    style={{
                      whiteSpace: "pre-line",
                      whiteSpaceCollapse: "preserve",
                    }}
                  >
                    {comment.message}
                  </Text>
                  <Text inherit fz="xs" ta="end">
                    — {comment.author_contact}
                  </Text>
                </Card.Section>
              </Card>
            );
          })}
        </>
      ) : (
        <EmptyCard itemLabel="exploration comments" />
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
};

AdminExplorationCommentsPage.layout = page => (
  <AppLayout
    title={["admin", "exploration comments"]}
    breadcrumbs={[
      { title: "home", href: routes.home.show.path() },
      { title: "admin", href: routes.admin.show.path() },
      {
        title: "exploration comments",
        href: routes.adminExplorationComments.index.path(),
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

export default AdminExplorationCommentsPage;
