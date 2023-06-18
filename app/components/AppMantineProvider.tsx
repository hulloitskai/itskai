import type { FC, PropsWithChildren } from "react";

import { MantineProvider as MantineProvider } from "@mantine/core";
import { theme } from "~/helpers/mantine";

export type AppMantineProviderProps = PropsWithChildren;

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <MantineProvider
    withNormalizeCSS
    withGlobalStyles
    withCSSVariables
    {...{ theme }}
  >
    {children}
  </MantineProvider>
);

export default AppMantineProvider;
