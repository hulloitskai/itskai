import type { FC, PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { THEME } from "~/helpers/mantine";

export type EmailMantineProviderProps = PropsWithChildren;

const EmailMantineProvider: FC<EmailMantineProviderProps> = ({ children }) => (
  <MantineProvider theme={THEME} forceColorScheme="light">
    {children}
  </MantineProvider>
);

export default EmailMantineProvider;
