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
  title?: AppMetaProps["title"] | ((props: PageProps) => AppMetaProps["title"]);
  description?:
    | AppMetaProps["description"]
    | ((props: PageProps) => AppMetaProps["description"]);
  breadcrumbs?:
    | readonly (AppBreadcrumb | null | false)[]
    | ((props: PageProps) => readonly (AppBreadcrumb | null | false)[]);
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {}) | number;
  containerProps?: ContainerProps;
  withGutter?: boolean;
  gutterSize?: MantineSize | (string & {}) | number;
}

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
  const title = useMemo(
    () => (typeof titleProp === "function" ? titleProp(pageProps) : titleProp),
    [titleProp, pageProps],
  );
  const description = useMemo(
    () =>
      typeof descriptionProp === "function"
        ? descriptionProp(pageProps)
        : descriptionProp,
    [descriptionProp, pageProps],
  );

  // == Breadcrumbs
  const filteredBreadcrumbs = useMemo<AppBreadcrumb[]>(() => {
    if (breadcrumbsProp) {
      const allBreadcrumbs =
        typeof breadcrumbsProp === "function"
          ? breadcrumbsProp(pageProps)
          : breadcrumbsProp;
      return allBreadcrumbs.filter(x => !!x);
    }
    return [];
  }, [breadcrumbsProp, pageProps]);

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
            py={4}
            px={6}
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
