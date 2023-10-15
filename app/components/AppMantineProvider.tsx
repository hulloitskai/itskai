import type { FC, PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { APP_THEME } from "~/helpers/mantine";

import "@mantine/core/styles.layer.css";

export type AppMantineProviderProps = PropsWithChildren;

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <MantineProvider theme={APP_THEME} forceColorScheme="dark">
    {children}
  </MantineProvider>
);

export default AppMantineProvider;
