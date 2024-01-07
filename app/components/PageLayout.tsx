import type { FC, PropsWithChildren } from "react";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import PageTracking from "./PageTracking";
import MiniProfilerPageTracking from "./MiniProfilerPageTracking";

import "@mantine/notifications/styles.layer.css";
import "./PageLayout.css";

export type PageLayoutProps = PropsWithChildren;

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <>
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <Notifications position="top-center" />
    <PageTracking />
    <MiniProfilerPageTracking />
  </>
);

export default PageLayout;
