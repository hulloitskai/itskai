import {
  createPolymorphicComponent,
  NavLink,
  type NavLinkProps,
} from "@mantine/core";

import { useSidebarControls } from "~/helpers/sidebar";

export interface SidebarNavLinkProps extends NavLinkProps {}

const SidebarNavLink = createPolymorphicComponent<"a", SidebarNavLinkProps>(
  forwardRef<HTMLAnchorElement, SidebarNavLinkProps>(
    ({ onClick, ...otherProps }, ref) => {
      const sidebarControls = useSidebarControls();
      return (
        <NavLink
          {...{ ref }}
          onClick={event => {
            onClick?.(event);
            sidebarControls?.close();
          }}
          {...otherProps}
        />
      );
    },
  ),
);

export default SidebarNavLink;
