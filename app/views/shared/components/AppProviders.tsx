import React, { createElement, FC, PropsWithChildren } from "react";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";

export type AppProviderProps = PropsWithChildren;

const AppProviders: FC<AppProviderProps> = ({ children }) => (
  <MantineProvider>
    <ApolloProvider>{children}</ApolloProvider>
  </MantineProvider>
);

export default AppProviders;

// eslint-disable-next-line @typescript-eslint/ban-types
export const withAppProviders = <P extends {}>(component: FC<P>): FC<P> => {
  const wrappedComponent = (props: P) => (
    <AppProviders>{createElement(component, props)}</AppProviders>
  );
  wrappedComponent.displayName = component.displayName;
  return wrappedComponent;
};
