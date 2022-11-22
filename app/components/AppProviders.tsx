import type { FC } from "react";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";

import type { ProviderProps } from "~/helpers/inertia";

export type AppProvidersProps = ProviderProps;

const AppProviders: FC<AppProvidersProps> = ({ page, children }) => (
  <ApolloProvider {...{ page }}>
    <MantineProvider>{children} </MantineProvider>
  </ApolloProvider>
);

export default AppProviders;
