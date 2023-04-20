import type { ReactElement, ReactNode } from "react";
import type { Page } from "@inertiajs/core";

export type PageConsumerProps<PageProps extends Record<string, any>> = {
  children: (page: Page<PageProps>) => ReactNode;
};

const PageConsumer = <PageProps extends Record<string, any>>({
  children,
}: PageConsumerProps<PageProps>): ReactElement => {
  const data = usePage() as Page<PageProps>;
  const content = useMemo(() => children(data), [children, data]);
  return <>{content}</>;
};

export default PageConsumer;
