import type { SharedPageProps } from "~/types";
import type { PageComponent } from ".";

import PageLayout from "~/components/PageLayout";

export const preparePage = <Props extends SharedPageProps>(
  page: PageComponent<Props>,
): void => {
  if (!page.layout) {
    page.layout = children => <PageLayout>{children}</PageLayout>;
  }
};
