import type { FC, PropsWithChildren } from "react";
import PageContainer from "./PageContainer";

export type BlankLayoutProps = PropsWithChildren;

const BlankLayout: FC<BlankLayoutProps> = ({ children }) => (
  <PageContainer>{children}</PageContainer>
);

export default BlankLayout;
