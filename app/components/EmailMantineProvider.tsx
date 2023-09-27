import type { FC, PropsWithChildren } from "react";

import { MantineProvider as MantineProvider } from "@mantine/core";
import { THEME } from "~/helpers/mantine";

import "@mantine/core/styles.css";

export type EmailMantineProviderProps = PropsWithChildren;

const EmailMantineProvider: FC<EmailMantineProviderProps> = ({ children }) => (
  <MantineProvider theme={THEME} forceColorScheme="light">
    {children}
  </MantineProvider>
);

export default EmailMantineProvider;
