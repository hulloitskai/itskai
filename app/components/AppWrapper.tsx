import { type Page } from "@inertiajs/core";

import ActionCableProvider from "./ActionCableProvider";
import AppMantineProvider from "./AppMantineProvider";
import AppNavProgress from "./AppNavProgress";

export interface AppWrapperProps {
  initialPage: Page<SharedPageProps>;
}

const AppWrapper: FC<PropsWithChildren<AppWrapperProps>> = ({ children }) => (
  <ActionCableProvider>
    <AppMantineProvider>
      <AppNavProgress />
      {children}
    </AppMantineProvider>
  </ActionCableProvider>
);

export default AppWrapper;
