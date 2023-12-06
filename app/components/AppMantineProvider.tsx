import type { FC, PropsWithChildren } from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { APP_THEME } from "~/helpers/mantine";

import "@mantine/core/styles.layer.css";

export type AppMantineProviderProps = PropsWithChildren;

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider theme={APP_THEME} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  </>
);

export default AppMantineProvider;
