import type { PropsWithChildren } from "react";
import type { PageComponent, SharedPageProps } from "~/helpers/inertia";

import PageProviders from "./PageProviders";

export type PageContainerProps<PageProps> = PropsWithChildren<{
  readonly page: PageComponent<PageProps>;
  readonly pageProps: PageProps;
}>;

const PageContainer = <PageProps extends SharedPageProps>({
  page: Page,
  pageProps,
}: PageContainerProps<PageProps>) => (
  <PageProviders>
    <Page {...pageProps} />
  </PageProviders>
);

export default PageContainer;
