import type { FC, ReactNode } from "react";

import { AppShell } from "@mantine/core";
import type {
  AppShellProps,
  ContainerProps,
  MantineNumberSize,
} from "@mantine/core";

import Header from "./AppHeader";
import Footer from "./AppFooter";
import Flash from "./AppFlash";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type AppLayoutProps = AppShellProps & {
  readonly viewer: Maybe<AppViewerFragment>;
  readonly containerSize?: MantineNumberSize;
  readonly containerProps?: ContainerProps;
  readonly withContainer?: boolean;
  readonly withGutter?: boolean;
};

const AppLayout: FC<AppLayoutProps> = ({
  viewer,
  containerSize,
  containerProps,
  withContainer,
  withGutter,
  children,
  padding,
  ...otherProps
}) => {
  const theme = useMantineTheme();
  const content = useMemo(() => {
    let content: ReactNode = children;
    const size = containerSize || containerProps?.size || "sm";
    if (withContainer) {
      content = (
        <Container p={0} w="100%" {...{ size }} {...containerProps}>
          {content}
        </Container>
      );
      if (withGutter) {
        const { spacing, fn } = theme;
        const breakpoint = fn.size({
          sizes: {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1140,
            xl: 1320,
          },
          size,
        });
        const marginSize = `clamp(0px, calc((100vw - ${breakpoint}px - 32px) / 2), ${spacing.md}px)`;
        content = (
          <MediaQuery
            largerThan={breakpoint}
            styles={{ marginTop: marginSize, marginBottom: marginSize }}
          >
            {content}
          </MediaQuery>
        );
      }
    }
    return content;
  }, [withContainer, children]);
  return (
    <>
      <AppShell
        header={<Header {...{ viewer }} />}
        styles={{
          main: {
            minHeight: "calc(100vh - var(--mantine-footer-height, 0px))",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            paddingBottom: typeof padding === "number" ? padding : 16,
          },
        }}
        {...otherProps}
      >
        {content}
      </AppShell>
      <Footer />
      <Flash />
    </>
  );
};

export default AppLayout;
