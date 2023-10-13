import type { FC } from "react";

import { AppShell, Breadcrumbs } from "@mantine/core";
import type { AppShellProps, ContainerProps, MantineSize } from "@mantine/core";

import type { Maybe } from "~/helpers/graphql";
import type { AppViewerFragment } from "~/helpers/graphql";

import AppMeta from "./AppMeta";
import type { AppMetaProps } from "./AppMeta";

import ActivityStatus from "./ActivityStatus";
import AppMenu from "./AppMenu";
import AppFlash from "./AppFlash";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";
import PageContainer from "./PageContainer";
import PageLayout from "./PageLayout";

import "./AppLayout.css";

export type AppLayoutProps = AppMetaProps &
  AppShellProps & {
    readonly viewer: Maybe<AppViewerFragment>;
    readonly breadcrumbs?: ReadonlyArray<AppBreadcrumb | null | false>;
    readonly withContainer?: boolean;
    readonly containerSize?: MantineSize | (string & {}) | number;
    readonly containerProps?: ContainerProps;
    readonly withGutter?: boolean;
    readonly gutterSize?: MantineSize | (string & {}) | number;
  };

export type AppBreadcrumb = {
  readonly title: string;
  readonly href: string;
};

const AppLayout: FC<AppLayoutProps> = ({
  viewer,
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
    [withContainer, withGutter, containerSize, containerProps, children],
  );

  // == Markup
  return (
    <PageLayout>
      <AppMeta {...{ title, description, imageUrl, noIndex }} />
      <AppShell
        header={{ height: 38 }}
        footer={{ height: 32 }}
        padding={padding ?? (withContainer ? undefined : "md")}
        styles={{
          main: {
            minHeight: "calc(100dvh - var(--app-shell-footer-height, 0))",
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
            href="/"
            variant="subtle"
            size="compact-md"
            color="gray.0"
            radius="md"
            h="unset"
            py={4}
            px={6}
            fw={800}
            fz="md"
          >
            It&apos;s Kai
          </Button>
          <CurrentlyPlayingIsland />
          <AppMenu style={{ flexShrink: 0 }} {...{ viewer }} />
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
            borderTop: `${rem(1)} solid var(--mantine-color-dark-5)`,
          }}
        >
          <ActivityStatus h="100%" style={{ flexShrink: 1 }} />
        </Box>
      </AppShell>
      <AppFlash />
    </PageLayout>
  );
};

export default AppLayout;
