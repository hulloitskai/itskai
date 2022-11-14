import type { FC, PropsWithChildren } from "react";

import AppProviders from "./AppProviders";
import AppProgress from "./AppProgress";

export type AppContainerProps = PropsWithChildren;

const AppContainer: FC<AppContainerProps> = ({ children }) => (
  <AppProviders>
    {children}
    <AppProgress />
  </AppProviders>
);

export default AppContainer;
