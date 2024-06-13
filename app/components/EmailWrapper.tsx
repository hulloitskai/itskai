import type { FC, PropsWithChildren } from "react";

import EmailMantineProvider from "./EmailMantineProvider";

export interface EmailWrapperProps extends PropsWithChildren {}

const EmailWrapper: FC<EmailWrapperProps> = ({ children }) => (
  <EmailMantineProvider>{children}</EmailMantineProvider>
);

export default EmailWrapper;
