import { FC, PropsWithChildren } from "react";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";

export type AppProviderProps = PropsWithChildren;

const AppProviders: FC<AppProviderProps> = ({ children }) => (
  <MantineProvider>
    <ApolloProvider>{children}</ApolloProvider>
  </MantineProvider>
);

export default AppProviders;
