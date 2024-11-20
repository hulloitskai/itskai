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
          label="Settings"
          active={url.startsWith(routes.adminSettings.show.path())}
        />
        <SidebarNavLink
          component={Link}
          href={routes.adminExplorationComments.index.path()}
          leftSection={<ExplorationCommentIcon />}
          label="Exploration comments"
          active={url.startsWith(routes.adminExplorationComments.index.path())}
        />
        <SidebarNavLink
          component={Link}
          href={routes.adminNotifications.index.path()}
          leftSection={<NotificationIcon />}
          label="Notifications"
          active={url.startsWith(routes.adminNotifications.index.path())}
        />
      </AppShell.Section>
    </AppSidebar>
  );
};

export default AdminSidebar;
