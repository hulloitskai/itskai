import type { FC, PropsWithChildren } from "react";
import LayoutContainer from "./LayoutContainer";

export type BlankLayoutProps = PropsWithChildren;

const BlankLayout: FC<BlankLayoutProps> = ({ children }) => (
  <LayoutContainer>{children}</LayoutContainer>
);

export default BlankLayout;
