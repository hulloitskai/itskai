import type { FC } from "react";

import { AppShell, Breadcrumbs } from "@mantine/core";
import type { AppShellProps, ContainerProps, MantineSize } from "@mantine/core";

import type { Maybe } from "~/helpers/graphql";
import type { AppViewerFragment } from "~/helpers/graphql";

import JourneyAppMeta from "./JourneyAppMeta";
import type { JourneyAppMetaProps } from "./JourneyAppMeta";

// import AppMenu from "./AppMenu";
import AppFlash from "./AppFlash";
import PageContainer from "./PageContainer";
import PageLayout from "./PageLayout";

import "./AppLayout.css";
import classes from "./AppLayout.module.css";

export type JourneyAppLayoutProps = JourneyAppMetaProps &
  AppShellProps & {
    readonly viewer: Maybe<AppViewerFragment>;
    readonly breadcrumbs?: ReadonlyArray<JourneyAppBreadcrumb | null | false>;
    readonly withContainer?: boolean;
    readonly containerSize?: MantineSize | (string & {}) | number;
    readonly containerProps?: ContainerProps;
    readonly withGutter?: boolean;
    readonly gutterSize?: MantineSize | (string & {}) | number;
  };

export type JourneyAppBreadcrumb = {
  readonly title: string;
  readonly href: string;
};

const JourneyAppLayout: FC<JourneyAppLayoutProps> = ({
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
    () => (breadcrumbs?.filter(x => !!x) || []) as JourneyAppBreadcrumb[],
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

  return (
    <PageLayout>
      <JourneyAppMeta {...{ title, description, imageUrl, noIndex }} />
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
            Journey
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

export default JourneyAppLayout;
