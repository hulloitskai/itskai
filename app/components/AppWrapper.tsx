import { type Page } from "@inertiajs/core";

import ActionCableProvider from "./ActionCableProvider";
import AppMantineProvider from "./AppMantineProvider";
import AppNavProgress from "./AppNavProgress";

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
