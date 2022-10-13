import React, { FC } from "react";
import { AppShell, StackProps } from "@mantine/core";

import AppHeader from "./AppHeader";

export type AppLayoutProps = StackProps;

const AppLayout: FC<AppLayoutProps> = ({ children, ...otherProps }) => (
  <AppShell header={<AppHeader />}>
    <Container size="sm" p={0} mb="xl">
      <Stack {...otherProps}>{children}</Stack>
    </Container>
  </AppShell>
);

export default AppLayout;
