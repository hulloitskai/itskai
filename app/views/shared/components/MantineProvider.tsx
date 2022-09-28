import React, { FC, PropsWithChildren } from "react";

import { MantineProvider as _MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { theme } from "~views/shared/helpers/mantine";

export type MantineProviderProps = PropsWithChildren;

export const MantineProvider: FC<MantineProviderProps> = ({ children }) => {
  return (
    <_MantineProvider
      withNormalizeCSS
      withGlobalStyles
      withCSSVariables
      {...{ theme }}
    >
      <ModalsProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </ModalsProvider>
    </_MantineProvider>
  );
};

export default MantineProvider;
