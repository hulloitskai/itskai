import type { FC, PropsWithChildren } from "react";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";

export type AppProvidersProps = PropsWithChildren;

const AppProviders: FC<AppProvidersProps> = ({ children }) => (
  <MantineProvider>
    <ApolloProvider>{children}</ApolloProvider>
  </MantineProvider>
);

export default AppProviders;
