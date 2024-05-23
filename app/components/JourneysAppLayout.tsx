import type { FC } from "react";

import { AppShell, Breadcrumbs } from "@mantine/core";
import type { AppShellProps, ContainerProps, MantineSize } from "@mantine/core";

import type { AppViewerFragment } from "~/helpers/graphql";

import type { JourneysAppMetaProps } from "./JourneysAppMeta";
import JourneysAppMeta from "./JourneysAppMeta";

// import AppMenu from "./AppMenu";
import AppFlash from "./AppFlash";
import PageContainer from "./PageContainer";
import PageLayout from "./PageLayout";

import classes from "./AppLayout.module.css";

export type JourneysAppLayoutProps = JourneysAppMetaProps &
  AppShellProps & {
    readonly viewer: AppViewerFragment | null;
    readonly breadcrumbs?: ReadonlyArray<JourneysAppBreadcrumb | null | false>;
    readonly withContainer?: boolean;
    readonly containerSize?: MantineSize | (string & {}) | number;
    readonly containerProps?: ContainerProps;
    readonly withGutter?: boolean;
    readonly gutterSize?: MantineSize | (string & {}) | number;
  };

export type JourneysAppBreadcrumb = {
  readonly title: string;
  readonly href: string;
};

const JourneysAppLayout: FC<JourneysAppLayoutProps> = ({
  // viewer,
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
    () => (breadcrumbs?.filter(x => !!x) || []) as JourneysAppBreadcrumb[],
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
      <JourneysAppMeta {...{ title, description, imageUrl, noIndex }} />
      <AppShell
        header={{ height: 44 }}
        footer={{ height: 44 }}
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
            justifyContent: "center",
            columnGap: 6,
          }}
        >
          <Button
            component={Link}
            href="/"
            variant="subtle"
            size="compact-md"
            radius="md"
            px={6}
            fw={800}
            fz="md"
            className={classes.logo}
          >
            Journeys
          </Button>
          {/* <AppMenu style={{ flexShrink: 0 }} {...{ viewer }} /> */}
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
      </AppShell>
      <AppFlash />
    </PageLayout>
  );
};

export default JourneysAppLayout;
