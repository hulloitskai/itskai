import { MantineProvider } from "@mantine/core";

import { useTheme } from "~/helpers/mantine";

const EmailMantineProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <MantineProvider
      {...{ theme }}
      {...(import.meta.env.RAILS_ENV === "test" && {
        env: "test",
      })}
    >
      {children}
    </MantineProvider>
  );
};

export default EmailMantineProvider;
