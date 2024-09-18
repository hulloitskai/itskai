import { MantineProvider } from "@mantine/core";

import { THEME } from "~/helpers/mantine";

const EmailMantineProvider: FC<PropsWithChildren> = ({ children }) => (
  <MantineProvider theme={THEME}>{children}</MantineProvider>
);

export default EmailMantineProvider;
