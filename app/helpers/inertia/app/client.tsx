import type { ReactElement } from "react";
import AppWrapper from "~/components/AppWrapper";

import type { SetupAppOptions } from "~/helpers/inertia/app";

export const setupApp = ({ App, props }: SetupAppOptions): ReactElement => {
  const { initialPage } = props;
  return (
    <AppWrapper {...{ initialPage }}>
      <App {...props} />
    </AppWrapper>
  );
};
