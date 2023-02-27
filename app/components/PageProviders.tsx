import type { FC, PropsWithChildren } from "react";

import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

export type PageProvidersProps = PropsWithChildren;

const PageProviders: FC<PageProvidersProps> = ({ children }) => (
  <ModalsProvider modalProps={{ size: "md" }}>
    <NotificationsProvider position="top-center">
      {children}
    </NotificationsProvider>
  </ModalsProvider>
);

export default PageProviders;
