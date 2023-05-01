import type { FC } from "react";

import { Footer } from "@mantine/core";
import type { FooterProps } from "@mantine/core";

import ActivityStatusBadge from "./ActivityStatusBadge";

export type AppFooterProps = Omit<FooterProps, "height" | "children">;

const AppFooter: FC<AppFooterProps> = props => (
  <Footer height={32} px={8} sx={{ overflow: "hidden" }} {...props}>
    <ActivityStatusBadge h="100%" sx={{ flexShrink: 1 }} />
  </Footer>
);

export default AppFooter;
