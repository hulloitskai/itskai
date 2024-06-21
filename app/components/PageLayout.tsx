import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import PageMeta from "./PageMeta";
import PageTracking from "./PageTracking";
import MiniProfilerPageTracking from "./MiniProfilerPageTracking";

import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "./PageLayout-lowercasing.css";

export interface PageLayoutProps extends PropsWithChildren {}

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <>
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <Notifications position="top-center" />
    <PageMeta />
    <PageTracking />
    <MiniProfilerPageTracking />
  </>
);

export default PageLayout;
