import type { FC, PropsWithChildren } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import PageTracking from "./PageTracking";

export type PageContainerProps = PropsWithChildren;

const PageContainer: FC<PageContainerProps> = ({ children }) => (
  <>
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <Notifications position="top-center" />
    <PageTracking />
  </>
);

export default PageContainer;
