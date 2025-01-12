import {
  AppShell,
  type AppShellProps,
  Breadcrumbs,
  type ContainerProps,
  type MantineSize,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  type DynamicProp,
  resolveDynamicProp,
  useResolveDynamicProp,
} from "~/helpers/layout";
import { type SidebarControls } from "~/helpers/sidebar";

import AppHeader from "./AppHeader";
import AppMeta, { type AppMetaProps } from "./AppMeta";
import Attribution from "./Attribution";
import PageContainer from "./PageContainer";
import PageLayout from "./PageLayout";
import { SidebarControlsProvider } from "./SidebarControlsProvider";

import classes from "./AppLayout.module.css";

export interface AppLayoutProps<PageProps extends SharedPageProps>
  extends Omit<AppMetaProps, "title" | "description" | "manifestUrl">,
    Omit<AppShellProps, "title"> {
  title?: DynamicProp<PageProps, AppMetaProps["title"]>;
  description?: DynamicProp<PageProps, AppMetaProps["description"]>;
  manifestUrl?: DynamicProp<PageProps, AppMetaProps["manifestUrl"]>;
  breadcrumbs?: DynamicProp<PageProps, (AppBreadcrumb | null | false)[]>;
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {}) | number;
  containerProps?: ContainerProps;
  withGutter?: boolean;
  gutterSize?: MantineSize | (string & {}) | number;
  sidebar?: DynamicProp<PageProps, ReactNode>;
}

export interface AppBreadcrumb {
  title: string;
  href: string;
}

const AppLayout = <PageProps extends SharedPageProps = SharedPageProps>({
  title: titleProp,
  description: descriptionProp,
  manifestUrl: manifestUrlProp,
  imageUrl,
  noIndex,
  breadcrumbs: breadcrumbsProp,
  withContainer,
  containerSize,
  containerProps,
  withGutter,
  gutterSize,
  sidebar: sidebarProp,
  children,
  padding,
  ...otherProps
}: AppLayoutProps<PageProps>) => {
  const pageProps = usePageProps<PageProps>();

  // == Meta
  const title = useResolveDynamicProp(titleProp, pageProps);
  const description = useResolveDynamicProp(descriptionProp, pageProps);
  const manifestUrl = useResolveDynamicProp(manifestUrlProp, pageProps);

  // == Breadcrumbs
  const breadcrumbs = useMemo<AppBreadcrumb[]>(() => {
    return breadcrumbsProp
      ? resolveDynamicProp(breadcrumbsProp, pageProps).filter(x => !!x)
      : [];
  }, [breadcrumbsProp, pageProps]);

  // == Sidebar
  const sidebar = useResolveDynamicProp(sidebarProp, pageProps);
  const [
    sidebarOpened,
    { toggle: toggleSidebar, close: closeSidebar, open: openSidebar },
  ] = useDisclosure();
  const sidebarControls = useMemo<SidebarControls | null>(() => {
    return sidebar
      ? {
          opened: sidebarOpened,
          toggle: toggleSidebar,
          close: closeSidebar,
          open: openSidebar,
        }
      : null;
  }, [sidebar, sidebarOpened, toggleSidebar, closeSidebar, openSidebar]);

  // == Content
  const { style: containerStyle, ...otherContainerProps } =
    containerProps ?? {};
  const content = withContainer ? (
    <PageContainer
      size={containerSize ?? containerProps?.size}
      {...{ withGutter, gutterSize }}
      style={[
        { flexGrow: 1, display: "flex", flexDirection: "column" },
        containerStyle,
      ]}
      {...otherContainerProps}
    >
      {children}
    </PageContainer>
  ) : (
    children
  );

  const shell = (
    <AppShell
      header={{ height: 46 }}
      {...(sidebar && {
        navbar: {
          width: 240,
          breakpoint: "sm",
          collapsed: { mobile: !sidebarOpened },
        },
      })}
      padding={padding ?? (withContainer ? undefined : "md")}
      style={{
        "--app-shell-footer-height": rem(44),
      }}
      {...otherProps}
    >
      <AppHeader />
      {sidebar}
      <AppShell.Main className={classes.main}>
        {!isEmpty(breadcrumbs) && (
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
            {breadcrumbs.map(({ title, href }, index) => (
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
        ml="var(--app-shell-navbar-offset, 0px)"
        mb="env(safe-area-inset-bottom, 0px)"
        style={{
          overflow: "hidden",
          borderTop: `${rem(1)} solid var(--app-shell-border-color)`,
        }}
      >
        <Attribution h="100%" style={{ flexShrink: 1 }} />
      </Box>
    </AppShell>
  );
  return (
    <PageLayout>
      <AppMeta {...{ title, description, manifestUrl, imageUrl, noIndex }} />
      <SidebarControlsProvider controls={sidebarControls}>
        {shell}
      </SidebarControlsProvider>
    </PageLayout>
  );
};

export default AppLayout;
