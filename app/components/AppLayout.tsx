import {
  AppShell,
  type AppShellProps,
  Breadcrumbs,
  type ContainerProps,
  Image,
  type MantineSize,
} from "@mantine/core";

import logoSrc from "~/assets/images/logo-circle.png";

import AppFlash from "./AppFlash";
import AppMenu from "./AppMenu";
import AppMeta, { type AppMetaProps } from "./AppMeta";
import Attribution from "./Attribution";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";
import PageContainer from "./PageContainer";
import PageLayout from "./PageLayout";

import classes from "./AppLayout.module.css";

export interface AppLayoutProps<PageProps extends SharedPageProps>
  extends Omit<AppMetaProps, "title" | "description">,
    Omit<AppShellProps, "title"> {
  title?: DynamicProp<PageProps, AppMetaProps["title"]>;
  description?: DynamicProp<PageProps, AppMetaProps["description"]>;
  breadcrumbs?: DynamicProp<PageProps, (AppBreadcrumb | null | false)[]>;
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {}) | number;
  containerProps?: ContainerProps;
  withGutter?: boolean;
  gutterSize?: MantineSize | (string & {}) | number;
}

export type DynamicProp<PageProps extends SharedPageProps, T> =
  | T
  | ((props: PageProps) => T);

export interface AppBreadcrumb {
  title: string;
  href: string;
}

const AppLayout = <PageProps extends SharedPageProps = SharedPageProps>({
  title: titleProp,
  description: descriptionProp,
  imageUrl,
  noIndex,
  breadcrumbs: breadcrumbsProp,
  withContainer,
  containerSize,
  containerProps,
  withGutter,
  gutterSize,
  children,
  padding,
  ...otherProps
}: AppLayoutProps<PageProps>) => {
  const pageProps = usePageProps<PageProps>();

  // == Meta
  const title = useResolveDynamicProp(titleProp, pageProps);
  const description = useResolveDynamicProp(descriptionProp, pageProps);

  // == Breadcrumbs
  const breadcrumbs = useMemo<AppBreadcrumb[]>(() => {
    return breadcrumbsProp
      ? resolveDynamicProp(breadcrumbsProp, pageProps).filter(x => !!x)
      : [];
  }, [breadcrumbsProp, pageProps]);

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
      <AppMeta {...{ title, description, imageUrl, noIndex }} />
      <AppShell
        header={{ height: 46 }}
        footer={{ height: 44 }}
        padding={padding ?? (withContainer ? undefined : "md")}
        styles={{
          header: {
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 6,
          },
          main: {
            flexGrow: 1,
            minHeight: "calc(100dvh - var(--app-shell-footer-height, 0px))",
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          },
        }}
        {...otherProps}
      >
        <AppShell.Header>
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
          <CurrentlyPlayingIsland />
          <AppMenu style={{ flexShrink: 0 }} />
        </AppShell.Header>
        <AppShell.Main>
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

const useResolveDynamicProp = <PageProps extends SharedPageProps, T>(
  prop: T | ((props: PageProps) => T),
  pageProps: PageProps,
) => {
  return useMemo(() => resolveDynamicProp(prop, pageProps), [prop, pageProps]);
};

const resolveDynamicProp = <PageProps extends SharedPageProps, T>(
  prop: T | ((props: PageProps) => T),
  pageProps: PageProps,
) => {
  return prop instanceof Function ? prop(pageProps) : prop;
};
