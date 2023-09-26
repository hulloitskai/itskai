import type { PageProps } from "@inertiajs/core";
import EmailLayout from "~/components/EmailLayout";
import PageLayout from "~/components/PageLayout";

import { PageType } from "~/helpers/inertia/page";
import type { PageComponent } from "~/helpers/inertia/page";

export const preparePage = <P extends PageProps>(
  page: PageComponent<P>,
  type: PageType,
): void => {
  if (!page.layout) {
    if (type == PageType.Email) {
      page.layout = children => <EmailLayout>{children}</EmailLayout>;
    } else {
      page.layout = children => <PageLayout>{children}</PageLayout>;
    }
  }
};
