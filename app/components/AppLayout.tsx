import type { FC } from "react";
import type { User } from "~/types";

import type { AppShellProps, ContainerProps, MantineSize } from "@mantine/core";
import { AppShell, Breadcrumbs } from "@mantine/core";

import type { AppMetaProps } from "./AppMeta";
import AppMeta from "./AppMeta";

import Attribution from "./Attribution";
import AppMenu from "./AppMenu";
import AppFlash from "./AppFlash";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";
import PageContainer from "./PageContainer";
import PageLayout from "./PageLayout";

import classes from "./AppLayout.module.css";

export interface AppLayoutProps
  extends AppMetaProps,
    Omit<AppShellProps, "title"> {
  user?: User;
  breadcrumbs?: ReadonlyArray<AppBreadcrumb | null | false>;
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {}) | number;
  containerProps?: ContainerProps;
  withGutter?: boolean;
  gutterSize?: MantineSize | (string & {}) | number;
}

export type AppBreadcrumb = {
  title: string;
  href: string;
};

const AppLayout: FC<AppLayoutProps> = ({
  title,
  description,
  imageUrl,
  noIndex,
  breadcrumbs,
  withContainer,
  containerSize,
  containerProps,
  withGutter,
  gutterSize,
  children,
  padding,
  ...otherProps
}) => {
  // == Breadcrumbs
  const filteredBreadcrumbs = useMemo(
    () => (breadcrumbs?.filter(x => !!x) || []) as AppBreadcrumb[],
    [breadcrumbs],
  );

  // == Content
  const content = useMemo(
    () =>
      withContainer ? (
        <PageContainer
          size={containerSize || containerProps?.size}
          {...{ withGutter, gutterSize }}
          {...containerProps}
        >
          {children}
        </PageContainer>
      ) : (
        children
      ),
    [
      withContainer,
      containerSize,
      withGutter,
      gutterSize,
      containerProps,
      children,
    ],
  );

  return (
    <PageLayout>
      <AppMeta {...{ title, description, imageUrl, noIndex }} />
      <AppShell
        header={{ height: 44 }}
        footer={{ height: 44 }}
        padding={padding ?? (withContainer ? undefined : "md")}
        styles={{
          main: {
            minHeight: "calc(100dvh - var(--app-shell-footer-height, 0px))",
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          },
        }}
        {...otherProps}
      >
        <AppShell.Header
          p={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 6,
          }}
        >
          <Button
            component={Link}
            href={routes.home.show.path()}
            variant="subtle"
            size="compact-md"
            radius="md"
            h="unset"
            py={4}
            px={6}
            fw={800}
            fz="md"
            className={classes.logo}
          >
            It&apos;s Kai
          </Button>
          <CurrentlyPlayingIsland />
          <AppMenu style={{ flexShrink: 0 }} />
        </AppShell.Header>
        <AppShell.Main
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {!isEmpty(filteredBreadcrumbs) && (
            <Breadcrumbs
              mx={10}
              mt={6}
              classNames={{
                separator: classes.breadcrumbSeparator,
              }}
              styles={{
                root: {
                  flexWrap: "wrap",
                  rowGap: rem(4),
                },
                separator: {
                  marginLeft: 6,
                  marginRight: 6,
                },
              }}
            >
              {filteredBreadcrumbs.map(({ title, href }, index) => (
                <Anchor component={Link} href={href} key={index} size="sm">
                  {title}
                </Anchor>
              ))}
            </Breadcrumbs>
          )}
          {content}
        </AppShell.Main>
        <Box
          h="var(--app-shell-footer-height)"
          px={8}
          style={{
            overflow: "hidden",
            borderTop: `${rem(1)} solid var(--app-shell-border-color)`,
          }}
        >
          <Attribution h="100%" style={{ flexShrink: 1 }} />
        </Box>
      </AppShell>
      <AppFlash />
    </PageLayout>
  );
};

export default AppLayout;
