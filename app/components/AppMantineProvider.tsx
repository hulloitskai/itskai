import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { useTheme } from "~/helpers/mantine";

const AppMantineProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider {...{ theme }} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
};

export default AppMantineProvider;
