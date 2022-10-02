import React, { createElement, FC, PropsWithChildren } from "react";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";

export type ProviderProps = PropsWithChildren;

const Providers: FC<ProviderProps> = ({ children }) => (
  <MantineProvider>
    <ApolloProvider>{children}</ApolloProvider>
  </MantineProvider>
);

export default Providers;

// eslint-disable-next-line @typescript-eslint/ban-types
export const withProviders = <P extends {}>(component: FC<P>): FC<P> => {
  const wrappedComponent = (props: P) => (
    <Providers>{createElement(component, props)}</Providers>
  );
  wrappedComponent.displayName = component.displayName;
  return wrappedComponent;
};
