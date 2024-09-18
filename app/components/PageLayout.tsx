import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import ClarityTracking from "./ClarityTracking";
import FullStoryTracking from "./FullStoryTracking";
import MiniProfilerPageTracking from "./MiniProfilerPageTracking";
import PageMeta from "./PageMeta";
import SentryTracking from "./SentryTracking";

import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/manrope";

import "./PageLayout-lowercasing.css"; // lowercasing
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

const PageLayout: FC<PropsWithChildren> = ({ children }) => (
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
