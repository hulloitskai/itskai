import type { ReactNode } from "react";
import type { Page } from "@inertiajs/inertia";

export type PageConsumerProps<PageProps> = {
  children: (page: Page<PageProps>) => ReactNode;
};

const PageConsumer = <PageProps,>({
  children,
}: PageConsumerProps<PageProps>) => {
  const data = usePage() as Page<PageProps>;
  return <>{children(data)}</>;
};

export default PageConsumer;
