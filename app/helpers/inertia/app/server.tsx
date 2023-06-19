import type { ReactElement } from "react";
import AppWrapper from "~/components/AppWrapper";
import EmailWrapper from "~/components/EmailWrapper";

import { PageType, resolvePageType } from "~/helpers/inertia/page";
import type { SetupAppOptions } from "~/helpers/inertia/app";

export const setupApp = ({ App, props }: SetupAppOptions): ReactElement => {
  const { initialPage } = props;
  const pageType = resolvePageType(initialPage.component);
  const app = <App {...props} />;
  switch (pageType) {
    case PageType.Page:
      return <AppWrapper {...{ initialPage }}>{app}</AppWrapper>;
    case PageType.Email:
      return <EmailWrapper>{app}</EmailWrapper>;
  }
};
