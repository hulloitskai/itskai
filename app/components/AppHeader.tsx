import { AppShell, type AppShellHeaderProps, Burger } from "@mantine/core";
import { Image } from "@mantine/core";

import logoSrc from "~/assets/images/logo-circle.png";
import { useSidebarControls } from "~/helpers/sidebar";

import AppMenu from "./AppMenu";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";

import classes from "./AppHeader.module.css";

export interface AppHeaderProps extends Omit<AppShellHeaderProps, "children"> {}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ className, ...otherProps }, ref) => {
    const sidebarControls = useSidebarControls();
    return (
      <AppShell.Header
        {...{ ref }}
        px={8}
        className={cn("AppHeader-root", className)}
        {...otherProps}
      >
        <Group justify="space-between" gap={8} h="100%">
          <Group gap={8}>
            {sidebarControls && (
              <Burger
                opened={sidebarControls.opened}
                onClick={sidebarControls.toggle}
                hiddenFrom="sm"
                size="sm"
                color="dark"
              />
            )}
            <Button
              component={Link}
              href={routes.home.show.path()}
              variant="subtle"
              size="compact-md"
              leftSection={<Image src={logoSrc} w={24} />}
              h="unset"
              py={2}
              px={4}
              fw={800}
              fz="md"
              className={classes.logoButton}
            >
              It&apos;s Kai
            </Button>
          </Group>
          <CurrentlyPlayingIsland />
          <AppMenu style={{ flexShrink: 0 }} />
        </Group>
      </AppShell.Header>
    );
  },
);

export default AppHeader;
