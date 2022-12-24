import type { ReactNode } from "react";

import PageConsumer from "~/components/PageConsumer";

export type LayoutBuilder<PageProps> = (
  page: ReactNode,
  props: PageProps,
) => ReactNode;

export const buildLayout = <PageProps,>(
  fn: LayoutBuilder<PageProps>,
): ((page: ReactNode) => ReactNode) => {
  // eslint-disable-next-line react/display-name
  return page => (
    <PageConsumer<PageProps>>{({ props }) => fn(page, props)}</PageConsumer>
  );
};
