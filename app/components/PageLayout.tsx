import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import FullStoryTracking from "./FullStoryTracking";
import MiniProfilerPageTracking from "./MiniProfilerPageTracking";
import PageMeta from "./PageMeta";
import SentryTracking from "./SentryTracking";

import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "./PageLayout-lowercasing.css";

export interface PageLayoutProps extends PropsWithChildren {}

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <>
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <Notifications position="top-center" />
    <PageMeta />
    <FullStoryTracking />
    <SentryTracking />
    <MiniProfilerPageTracking />
  </>
);

export default PageLayout;
