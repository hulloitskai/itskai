import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import MiniProfilerPageTracking from "./MiniProfilerPageTracking";
import PageMeta from "./PageMeta";
import SentryTracking from "./SentryTracking";
import FullStoryTracking from "./FullStoryTracking";
import ClarityTracking from "./ClarityTracking";

// == Fonts
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";

// == Mantine
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

// == Lowercasing
import "./PageLayout-lowercasing.css";

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
