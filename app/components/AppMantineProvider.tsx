import type { FC, PropsWithChildren } from "react";

import { MantineProvider as MantineProvider } from "@mantine/core";
import { APP_THEME } from "~/helpers/mantine";

export type AppMantineProviderProps = PropsWithChildren;

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <MantineProvider
    withNormalizeCSS
    withGlobalStyles
    withCSSVariables
    theme={APP_THEME}
  >
    {children}
  </MantineProvider>
);

export default AppMantineProvider;
