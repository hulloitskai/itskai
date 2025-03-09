import { AppShell, type AppShellHeaderProps, Burger } from "@mantine/core";
import { Image } from "@mantine/core";

import logoSrc from "~/assets/images/logo-circle.png";
import { useIsStandalone } from "~/helpers/pwa";
import { useSidebarControls } from "~/helpers/sidebar";

import AppMenu from "./AppMenu";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";

import classes from "./AppHeader.module.css";

export interface AppHeaderProps extends Omit<AppShellHeaderProps, "children"> {
  logoHref?: string;
}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ className, logoHref, ...otherProps }, ref) => {
    const isStandalone = useIsStandalone();
    const sidebarControls = useSidebarControls();
    return (
      <AppShell.Header
        {...{ ref }}
        px={8}
        className={cn("AppHeader", classes.header, className)}
        {...otherProps}
      >
        <Group justify="space-between" gap={8} h="100%">
          <Group gap={4}>
            {sidebarControls && (
              <Burger
                className={classes.clickable}
                opened={sidebarControls.opened}
                onClick={sidebarControls.toggle}
                hiddenFrom="sm"
                size="sm"
              />
            )}
            <Button
              component={Link}
              href={logoHref ?? routes.home.show.path()}
              variant="subtle"
              size="compact-md"
              leftSection={<Image src={logoSrc} w={24} />}
              className={classes.logoButton}
            >
              It&apos;s Kai
            </Button>
          </Group>
          <CurrentlyPlayingIsland className={classes.clickable} />
          {!isStandalone && <AppMenu className={classes.menu} />}
        </Group>
      </AppShell.Header>
    );
  },
);

export default AppHeader;
