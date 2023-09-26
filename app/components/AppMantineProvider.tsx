import type { FC, PropsWithChildren } from "react";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { THEME } from "~/helpers/mantine";

import "@mantine/core/styles.css";

export type AppMantineProviderProps = PropsWithChildren;

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <>
    <ColorSchemeScript forceColorScheme="dark" />
    <MantineProvider theme={THEME} forceColorScheme="dark">
      {children}
    </MantineProvider>
  </>
);

export default AppMantineProvider;
