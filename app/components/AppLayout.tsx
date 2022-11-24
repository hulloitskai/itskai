import type { FC } from "react";

import { AppShell } from "@mantine/core";
import type { AppShellProps } from "@mantine/core";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppFlash from "./AppFlash";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type AppLayoutProps = AppShellProps & {
  readonly viewer: Maybe<AppViewerFragment>;
  readonly withContainer?: boolean;
};

const AppLayout: FC<AppLayoutProps> = ({
  viewer,
  withContainer = true,
  children,
  ...otherProps
}) => {
  const content = useMemo(() => {
    if (withContainer) {
      return (
        <Container size="sm" mb="xl" p={0}>
          {children}
        </Container>
      );
    }
    return children;
  }, [withContainer]);
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
            paddingBottom: 0,
          },
        }}
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
