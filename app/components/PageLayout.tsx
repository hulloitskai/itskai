import { ModalsProvider } from "@mantine/modals";

import AppFlash from "./AppFlash";
import ClarityTracking from "./ClarityTracking";
import FullStoryTracking from "./FullStoryTracking";
import MiniProfilerPageTracking from "./MiniProfilerPageTracking";
import PageMeta from "./PageMeta";
import SentryTracking from "./SentryTracking";
import WebPushProvider from "./WebPushProvider";

import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/manrope";
import "@fontsource-variable/bricolage-grotesque";

import "./PageLayout-lowercasing.css"; // lowercasing
import "@mantine/core/styles.layer.css";

const PageLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WebPushProvider>
      <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
    </WebPushProvider>
    <PageMeta />
    <AppFlash />
    <SentryTracking />
    <FullStoryTracking />
    <ClarityTracking />
    <MiniProfilerPageTracking />
  </>
);

export default PageLayout;
