import { MantineProvider } from "@mantine/core";

import { useTheme } from "~/helpers/mantine";

const EmailMantineProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return <MantineProvider {...{ theme }}>{children}</MantineProvider>;
};

export default EmailMantineProvider;
