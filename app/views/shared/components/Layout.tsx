import React, { FC, PropsWithChildren } from "react";

import MantineProvider from "~views/shared/components/MantineProvider";

export type LayoutProps = PropsWithChildren;

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export default Layout;
