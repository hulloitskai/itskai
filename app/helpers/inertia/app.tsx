import type { ReactElement } from "react";
import type { SetupOptions } from "@inertiajs/react/types/createInertiaApp";
import type { Page, PageProps } from "@inertiajs/core";
import type { SharedPageProps } from "./page";

import AppContainer from "~/components/AppContainer";

export type SetupAppOptions = Omit<SetupOptions<null, PageProps>, "el">;

export const setupApp = ({ App, props }: SetupAppOptions): ReactElement => (
  <AppContainer initialPage={props.initialPage as Page<SharedPageProps>}>
    <App {...props} />
  </AppContainer>
);
