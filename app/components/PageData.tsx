import type { ReactNode } from "react";

export type PageDataProps<T> = {
  children: (data: T) => ReactNode;
};

const PageData = <PageProps extends { data: T }, T = PageProps["data"]>({
  children,
}: PageDataProps<T>) => {
  const data = usePageData<PageProps>();
  return <>{children(data)}</>;
};

export default PageData;
