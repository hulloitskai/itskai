import type { FC, PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppFlash from "./AppFlash";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type AppLayoutProps = PropsWithChildren<{
  readonly viewer: Maybe<AppViewerFragment>;
}>;

const AppLayout: FC<AppLayoutProps> = ({ viewer, children }) => (
  <>
    <AppShell header={<AppHeader {...{ viewer }} />}>
      <Container size="sm" p={0} mb="xl">
        {children}
      </Container>
    </AppShell>
    <AppFooter />
    <AppFlash />
  </>
);

export default AppLayout;
