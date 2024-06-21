import type { Page } from "@inertiajs/core";

import AppMantineProvider from "./AppMantineProvider";
import AppProgress from "./AppProgress";
import ActionCableProvider from "./ActionCableProvider";

export interface AppWrapperProps extends PropsWithChildren {
  initialPage: Page<SharedPageProps>;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => (
  <ActionCableProvider>
    <AppMantineProvider>
      <AppProgress />
      {children}
    </AppMantineProvider>
  </ActionCableProvider>
);

export default AppWrapper;
