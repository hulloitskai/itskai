import type { FC } from "react";

import AppProviders from "./AppProviders";
import AppProgress from "./AppProgress";

import type { ProviderProps } from "~/helpers/inertia";

export type AppContainerProps = ProviderProps;

const AppContainer: FC<AppContainerProps> = ({ page, children }) => (
  <AppProviders {...{ page }}>
    {children}
    <AppProgress />
  </AppProviders>
);

export default AppContainer;
