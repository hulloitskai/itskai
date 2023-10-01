import type { FC, PropsWithChildren } from "react";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import MantineCssVariables from "./MantineCssVariables";
import PageTracking from "./PageTracking";

import "@mantine/notifications/styles.css";
import "./PageLayout.css";

export type PageLayoutProps = PropsWithChildren;

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <>
    <MantineCssVariables cssVariablesSelector="body" />
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <Notifications position="top-center" />
    <PageTracking />
  </>
);

export default PageLayout;
