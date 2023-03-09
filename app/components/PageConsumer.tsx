import type { ReactNode } from "react";
import type { Page } from "@inertiajs/core";

export type PageConsumerProps<PageProps extends Record<string, any>> = {
  children: (page: Page<PageProps>) => ReactNode;
};

const PageConsumer = <PageProps extends Record<string, any>>({
  children,
}: PageConsumerProps<PageProps>) => {
  const data = usePage() as Page<PageProps>;
  return <>{children(data)}</>;
};

export default PageConsumer;
