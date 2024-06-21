import type { ReactElement, ReactNode } from "react";
import type { Page } from "@inertiajs/core";

export interface PageConsumerProps<PageProps extends Record<string, any>> {
  children: (page: Page<PageProps & SharedPageProps>) => ReactNode;
}

const PageConsumer = <PageProps extends Record<string, any>>({
  children,
}: PageConsumerProps<PageProps>): ReactElement => {
  const data = usePage<PageProps & SharedPageProps>();
  const content = useMemo(() => children(data), [children, data]);
  return <>{content}</>;
};

export default PageConsumer;
