import React from "react";
import type { FC, PropsWithChildren } from "react";

import MantineProvider from "~components/MantineProvider";

export type LayoutProps = PropsWithChildren;

const Layout: FC<LayoutProps> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export default Layout;
