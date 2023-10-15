import type { FC, PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { EMAIL_THEME } from "~/helpers/mantine";

import "@mantine/core/styles.css";

export type EmailMantineProviderProps = PropsWithChildren;

const EmailMantineProvider: FC<EmailMantineProviderProps> = ({ children }) => (
  <MantineProvider theme={EMAIL_THEME} forceColorScheme="light">
    {children}
  </MantineProvider>
);

export default EmailMantineProvider;
