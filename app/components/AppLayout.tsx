import type { FC } from "react";

import { AppShell, Breadcrumbs } from "@mantine/core";
import type {
  AppShellProps,
  ContainerProps,
  MantineNumberSize,
} from "@mantine/core";

import AppMeta from "./AppMeta";
import type { AppMetaProps } from "./AppMeta";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppFlash from "./AppFlash";
import PageLayout from "./PageLayout";
import PageContainer from "./PageContainer";

import type { Maybe } from "~/helpers/graphql";
import type { AppViewerFragment } from "~/helpers/graphql";

export type AppLayoutProps = AppMetaProps &
  AppShellProps & {
    readonly viewer: Maybe<AppViewerFragment>;
    readonly breadcrumbs?: ReadonlyArray<AppBreadcrumb | null | false>;
    readonly containerSize?: MantineNumberSize;
    readonly containerProps?: ContainerProps;
    readonly withContainer?: boolean;
    readonly withGutter?: boolean;
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
  breadcrumbs,
  containerSize,
  containerProps,
  withContainer,
  withGutter,
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
          {...{ withGutter }}
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
      <AppMeta {...{ title, description, imageUrl }} />
      <AppShell
        header={<AppHeader {...{ viewer }} />}
        styles={{
          main: {
            minHeight: "calc(100vh - var(--mantine-footer-height, 0px))",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            paddingBottom: 0,
          },
        }}
        padding={0}
        {...otherProps}
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
        <Box
          p={padding ?? (withContainer ? undefined : "md")}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {content}
        </Box>
      </AppShell>
      <AppFooter />
      <AppFlash />
    </PageLayout>
  );
};

export default AppLayout;
