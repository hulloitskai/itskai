import type { FC, PropsWithChildren } from "react";

import PageWrapper from "./PageWrapper";

import "./PageLayout.css";

export type PageLayoutProps = PropsWithChildren;

const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <PageWrapper>{children}</PageWrapper>
);

export default PageLayout;
