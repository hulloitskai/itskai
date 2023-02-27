import type { PropsWithChildren } from "react";
import type { PageComponent } from "~/helpers/inertia";

import PageProviders from "./PageProviders";

export type PageContainerProps<P> = PropsWithChildren<{
  readonly page: PageComponent<P>;
  readonly pageProps: P;
}>;

const PageContainer = <P,>({
  page: Page,
  pageProps,
}: PageContainerProps<P>) => (
  <PageProviders>
    <Page {...(pageProps as any)} />
  </PageProviders>
);

export default PageContainer;
