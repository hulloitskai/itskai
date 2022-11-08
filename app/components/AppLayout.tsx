import type { FC, PropsWithChildren, ReactElement } from "react";
import { AppShell } from "@mantine/core";

import AppProgress from "./AppProgress";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export type AppLayoutProps = PropsWithChildren;

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <>
    <AppProgress />
    <AppShell header={<AppHeader />}>
      <Container size="sm" p={0} mb="xl">
        {children}
      </Container>
    </AppShell>
    <AppFooter />
  </>
);

export default AppLayout;

export const withAppLayout = (page: ReactElement): ReactElement => {
  return <AppLayout>{page}</AppLayout>;
};
