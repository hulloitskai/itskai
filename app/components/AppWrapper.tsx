import type { Page } from "@inertiajs/core";

import AppMantineProvider from "./AppMantineProvider";
import AppNavProgress from "./AppNavProgress";
import ActionCableProvider from "./ActionCableProvider";

export interface AppWrapperProps extends PropsWithChildren {
  initialPage: Page<SharedPageProps>;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => (
  <ActionCableProvider>
    <AppMantineProvider>
      <AppNavProgress />
      {children}
    </AppMantineProvider>
  </ActionCableProvider>
);

export default AppWrapper;
