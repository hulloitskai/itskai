import type { PageProps } from "@inertiajs/core";
import PageLayout from "~/components/PageLayout";

import type { PageComponent } from "~/helpers/inertia/page";

export const preparePage = <P extends PageProps>(
  page: PageComponent<P>,
): void => {
  if (!page.layout) {
    page.layout = children => <PageLayout>{children}</PageLayout>;
  }
};
