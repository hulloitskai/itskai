import { AppShell, type AppShellNavbarProps } from "@mantine/core";

import classes from "./AppSidebar.module.css";

export interface AppSidebarProps extends AppShellNavbarProps {}

const AppSidebar: FC<AppSidebarProps> = ({ className, ...otherProps }) => (
  <AppShell.Navbar className={cn(classes.root, className)} {...otherProps} />
);

export default AppSidebar;
