import type { FC } from "react";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";

import type { ProviderProps } from "~/helpers/inertia";

export type AppProvidersProps = ProviderProps;

const AppProviders: FC<AppProvidersProps> = ({ page, children }) => (
  <MantineProvider>
    <ApolloProvider {...{ page }}>{children}</ApolloProvider>
  </MantineProvider>
);

export default AppProviders;
