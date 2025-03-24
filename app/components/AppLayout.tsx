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
import { useClearAppBadge } from "~/helpers/pwa";
import { type SidebarControls } from "~/helpers/sidebar";

import AppHeader, { type AppHeaderProps } from "./AppHeader";
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
  logoHref?: DynamicProp<PageProps, AppHeaderProps["logoHref"]>;
}

export interface AppBreadcrumb {
  title: string;
  href: string;
}

const LAYOUT_WITH_BORDER = false;

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
  logoHref: logoHrefProp,
  children,
  padding,
  ...otherProps
}: AppLayoutProps<PageProps>) => {
  useClearAppBadge();

  // == Meta
  const title = useResolveDynamicProp(titleProp);
  const description = useResolveDynamicProp(descriptionProp);
  const manifestUrl = useResolveDynamicProp(manifestUrlProp);

  // == Breadcrumbs
  const page = usePage<PageProps>();
  const breadcrumbs = useMemo<AppBreadcrumb[]>(() => {
    return breadcrumbsProp
      ? resolveDynamicProp(breadcrumbsProp, page).filter(x => !!x)
      : [];
  }, [breadcrumbsProp, page]);

  // == Sidebar
  const sidebar = useResolveDynamicProp(sidebarProp);
  const logoHref = useResolveDynamicProp(logoHrefProp);
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

  return (
    <PageLayout>
      <AppMeta {...{ title, description, manifestUrl, imageUrl, noIndex }} />
      <SidebarControlsProvider controls={sidebarControls}>
        <AppShell
          withBorder={LAYOUT_WITH_BORDER}
          header={{ height: 46 }}
          {...(sidebar && {
            navbar: {
              width: 240,
              breakpoint: "sm",
              collapsed: { mobile: !sidebarOpened },
            },
          })}
          padding={padding ?? (withContainer ? undefined : "md")}
          classNames={{
            root: classes.shell,
            header: classes.header,
            navbar: classes.navbar,
          }}
          {...otherProps}
        >
          <AppHeader {...{ logoHref }} />
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
          <Center
            component="footer"
            className={classes.footer}
            mod={{ "with-border": LAYOUT_WITH_BORDER }}
          >
            <Attribution />
          </Center>
        </AppShell>
      </SidebarControlsProvider>
    </PageLayout>
  );
};

export default AppLayout;
