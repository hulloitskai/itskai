import type { FC, PropsWithChildren } from "react";

import { MantineProvider as MantineProvider } from "@mantine/core";
import { emailTheme } from "~/helpers/mantine";

export type EmailMantineProviderProps = PropsWithChildren;

const EmailMantineProvider: FC<EmailMantineProviderProps> = ({ children }) => (
  <MantineProvider withNormalizeCSS withGlobalStyles theme={emailTheme}>
    {children}
  </MantineProvider>
);

export default EmailMantineProvider;
