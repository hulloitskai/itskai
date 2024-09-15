import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { THEME } from "~/helpers/mantine";

export interface AppMantineProviderProps extends PropsWithChildren {}

const AppMantineProvider: FC<AppMantineProviderProps> = ({ children }) => (
  <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider theme={THEME} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  </>
);

export default AppMantineProvider;
