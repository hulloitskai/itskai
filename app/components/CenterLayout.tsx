import type { FC, PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppFlash from "./AppFlash";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type CenterLayoutProps = PropsWithChildren<{
  readonly viewer: Maybe<AppViewerFragment>;
}>;

const CenterLayout: FC<CenterLayoutProps> = ({ viewer, children }) => (
  <>
    <AppShell header={<AppHeader {...{ viewer }} />}>
      <Center h="100%">{children}</Center>
    </AppShell>
    <AppFooter />
    <AppFlash />
  </>
);

export default CenterLayout;
