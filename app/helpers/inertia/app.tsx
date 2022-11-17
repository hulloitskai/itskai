import type { ReactElement } from "react";
import type { Page, PageProps } from "@inertiajs/inertia";
import type { SetupOptions } from "@inertiajs/inertia-react";
import type { SharedPageProps } from "./page";

import AppContainer from "~/components/AppContainer";

export type SetupAppOptions = Omit<SetupOptions<null, PageProps>, "el">;

export const setupApp = ({ App, props }: SetupAppOptions): ReactElement => (
  <AppContainer page={props.initialPage as Page<SharedPageProps>}>
    <App {...props} />
  </AppContainer>
);
