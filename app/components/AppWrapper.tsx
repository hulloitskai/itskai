import { type Page } from "@inertiajs/core";

import ActionCableProvider from "./ActionCableProvider";
import AppMantineProvider from "./AppMantineProvider";
import AppNavProgress from "./AppNavProgress";
import Toaster from "./Toaster";

export interface AppWrapperProps extends PropsWithChildren {
  initialPage: Page<SharedPageProps>;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => (
  <ActionCableProvider>
    <AppMantineProvider>
      <AppNavProgress />
      <Toaster />
      {children}
    </AppMantineProvider>
  </ActionCableProvider>
);

export default AppWrapper;
