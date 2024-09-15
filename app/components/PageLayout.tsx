import "@fontsource-variable/jetbrains-mono";
// == Fonts
import "@fontsource-variable/manrope";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import ClarityTracking from "./ClarityTracking";
import FullStoryTracking from "./FullStoryTracking";
import MiniProfilerPageTracking from "./MiniProfilerPageTracking";
import PageMeta from "./PageMeta";
import SentryTracking from "./SentryTracking";

// == Lowercasing
import "./PageLayout-lowercasing.css";
// == Mantine
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

export interface PageLayoutProps extends PropsWithChildren {}

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <>
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    <Notifications position="top-right" />
    <PageMeta />
    <SentryTracking />
    <FullStoryTracking />
    <ClarityTracking />
    <MiniProfilerPageTracking />
  </>
);

export default PageLayout;
