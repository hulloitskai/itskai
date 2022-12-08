import type { FC } from "react";

import { AppShell } from "@mantine/core";
import type { AppShellProps, ContainerProps } from "@mantine/core";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppFlash from "./AppFlash";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type AppLayoutProps = AppShellProps & {
  readonly viewer: Maybe<AppViewerFragment>;
  readonly containerProps?: ContainerProps;
  readonly withContainer?: boolean;
};

const AppLayout: FC<AppLayoutProps> = ({
  viewer,
  containerProps,
  withContainer,
  children,
  padding,
  ...otherProps
}) => {
  const content = useMemo(() => {
    if (withContainer) {
      return (
        <Container size="sm" mb="xl" p={0} {...containerProps}>
          {children}
        </Container>
      );
    }
    return children;
  }, [withContainer, children]);
  return (
    <>
      <AppShell
        header={<AppHeader {...{ viewer }} />}
        styles={{
          main: {
            minHeight: "calc(100vh - var(--mantine-footer-height, 0px))",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            paddingBottom: typeof padding === "number" ? padding : 16,
          },
        }}
        {...{ padding }}
        {...otherProps}
      >
        {content}
      </AppShell>
      <AppFooter />
      <AppFlash />
    </>
  );
};

export default AppLayout;
