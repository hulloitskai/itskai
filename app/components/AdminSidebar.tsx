import { AppShell, type AppShellNavbarProps } from "@mantine/core";

import AppSidebar from "./AppSidebar";
import SidebarNavLink from "./SidebarNavLink";

export interface AdminSidebarProps
  extends Omit<AppShellNavbarProps, "children"> {}

const AdminSidebar: FC<AdminSidebarProps> = props => {
  const { url } = usePage();
  return (
    <AppSidebar {...props}>
      <AppShell.Section>
        <SidebarNavLink
          component={Link}
          href={routes.adminSettings.show.path()}
          leftSection={<AdminIcon />}
          label="settings"
          active={url.startsWith(routes.adminSettings.show.path())}
        />
        <SidebarNavLink
          component={Link}
          href={routes.adminNotifications.index.path()}
          leftSection={<NotificationIcon />}
          label="notifications"
          active={url.startsWith(routes.adminNotifications.index.path())}
        />
        <SidebarNavLink
          component={Link}
          href={routes.adminExplorationComments.index.path()}
          leftSection={<ExplorationCommentIcon />}
          label="exploration comments"
          active={url.startsWith(routes.adminExplorationComments.index.path())}
        />
        <SidebarNavLink
          component={Link}
          href={routes.adminFriends.index.path()}
          leftSection={<FriendsIcon />}
          label="friends"
          active={url.startsWith(routes.adminFriends.index.path())}
        />
        <SidebarNavLink
          component={Link}
          href={routes.adminStatuses.index.path()}
          leftSection={<EmojiIcon />}
          label="statuses"
          active={url.startsWith(routes.adminStatuses.index.path())}
        />
      </AppShell.Section>
    </AppSidebar>
  );
};

export default AdminSidebar;
