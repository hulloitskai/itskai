import type { ReactNode } from "react";
import PageData from "~/components/PageData";

export type LayoutWithDataFn<T> = (page: ReactNode, data: T) => ReactNode;

export const layoutWithData = <
  PageProps extends { data: T },
  T = PageProps["data"],
>(
  fn: LayoutWithDataFn<T>,
): ((page: ReactNode) => ReactNode) => {
  // eslint-disable-next-line react/display-name
  return page => <PageData<PageProps>>{data => fn(page, data)}</PageData>;
};
