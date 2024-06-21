import EmailMantineProvider from "./EmailMantineProvider";

export interface EmailWrapperProps extends PropsWithChildren {}

const EmailWrapper: FC<EmailWrapperProps> = ({ children }) => (
  <EmailMantineProvider>{children}</EmailMantineProvider>
);

export default EmailWrapper;
