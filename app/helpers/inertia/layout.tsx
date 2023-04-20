import type { ReactNode } from "react";

import PageConsumer from "~/components/PageConsumer";

export type LayoutBuilder<PageProps> = (
  page: ReactNode,
  props: PageProps,
) => ReactNode;

export const buildLayout = <PageProps extends Record<string, any>>(
  fn: LayoutBuilder<PageProps>,
): ((page: ReactNode) => ReactNode) => {
  const Layout = (page: ReactNode) => (
    <PageConsumer<PageProps>>{({ props }) => fn(page, props)}</PageConsumer>
  );
  return Layout;
};
