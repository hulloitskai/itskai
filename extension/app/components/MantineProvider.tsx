import type { FC, PropsWithChildren } from "react";

import { MantineProvider as _MantineProvider } from "@mantine/core";
import { THEME } from "~/helpers/mantine";

export type MantineProviderProps = PropsWithChildren;

const MantineProvider: FC<MantineProviderProps> = ({ children }) => (
  <_MantineProvider
    withNormalizeCSS
    withGlobalStyles
    withCSSVariables
    theme={THEME}
  >
    {children}
  </_MantineProvider>
);

export default MantineProvider;
