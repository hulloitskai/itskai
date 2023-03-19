import type { FC, PropsWithChildren } from "react";

import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

export type LayoutContainerProps = PropsWithChildren;

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => (
  <ModalsProvider modalProps={{ size: "md" }}>
    <NotificationsProvider position="top-center">
      {children}
    </NotificationsProvider>
  </ModalsProvider>
);

export default LayoutContainer;
