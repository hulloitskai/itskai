import type { ComponentType, PropsWithChildren } from "react";
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
    const Layout: ComponentType<PropsWithChildren> =
      type == PageType.Email ? EmailLayout : PageLayout;
    page.layout = children => <Layout>{children}</Layout>;
  }
};
