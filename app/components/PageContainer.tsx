import type { FC, PropsWithChildren } from "react";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export type PageContainerProps = PropsWithChildren;

const PageContainer: FC<PageContainerProps> = ({ children }) => (
  <>
    <Notifications position="top-center" />
    <ModalsProvider modalProps={{ size: "md" }}>{children}</ModalsProvider>
  </>
);

export default PageContainer;
