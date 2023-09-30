import type { FC, PropsWithChildren } from "react";

import { /* ColorSchemeScript, */ MantineProvider } from "@mantine/core";
import { EMAIL_THEME } from "~/helpers/mantine";

import "@mantine/core/styles.css";

export type EmailMantineProviderProps = PropsWithChildren;

const EmailMantineProvider: FC<EmailMantineProviderProps> = ({ children }) => (
  <>
    {/* <ColorSchemeScript forceColorScheme="light" /> */}
    <MantineProvider
      theme={EMAIL_THEME}
      cssVariablesSelector="body"
      forceColorScheme="light"
      withCssVariables={false}
    >
      {children}
    </MantineProvider>
  </>
);

export default EmailMantineProvider;
