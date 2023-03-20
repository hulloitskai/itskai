import type { FC, PropsWithChildren } from "react";

import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

export type PageContainerProps = PropsWithChildren;

const PageContainer: FC<PageContainerProps> = ({ children }) => (
  <ModalsProvider modalProps={{ size: "md" }}>
    <NotificationsProvider position="top-center">
      {children}
    </NotificationsProvider>
  </ModalsProvider>
);

export default PageContainer;
