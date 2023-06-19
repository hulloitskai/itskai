import type { FC, PropsWithChildren } from "react";

import { MantineProvider as MantineProvider } from "@mantine/core";
import { EMAIL_THEME } from "~/helpers/mantine";

export type EmailMantineProviderProps = PropsWithChildren;

const EmailMantineProvider: FC<EmailMantineProviderProps> = ({ children }) => (
  <MantineProvider withNormalizeCSS withGlobalStyles theme={EMAIL_THEME}>
    {children}
  </MantineProvider>
);

export default EmailMantineProvider;
