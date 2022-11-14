import type { FC, PropsWithChildren, ReactElement } from "react";
import { AppShell } from "@mantine/core";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppFlash from "./AppFlash";

export type CenterLayoutProps = PropsWithChildren;

const CenterLayout: FC<CenterLayoutProps> = ({ children }) => (
  <>
    <AppShell header={<AppHeader />}>
      <Center h="100%">{children}</Center>
    </AppShell>
    <AppFooter />
    <AppFlash />
  </>
);

export default CenterLayout;

export const withCenterLayout = (page: ReactElement): ReactElement => {
  return <CenterLayout>{page}</CenterLayout>;
};
