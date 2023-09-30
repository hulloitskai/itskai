import type { FC, PropsWithChildren } from "react";

import { /* ColorSchemeScript, */ MantineProvider } from "@mantine/core";
import { APP_THEME } from "~/helpers/mantine";

import "@mantine/core/styles.css";

export type AppMantineProviderProps = PropsWithChildren;

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <>
    {/* <ColorSchemeScript forceColorScheme="dark" /> */}
    <MantineProvider
      theme={APP_THEME}
      forceColorScheme="dark"
      withCssVariables={false}
    >
      {children}
    </MantineProvider>
  </>
);

export default AppMantineProvider;
