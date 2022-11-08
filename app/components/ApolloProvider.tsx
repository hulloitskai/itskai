import { FC, PropsWithChildren } from "react";

import { ApolloProvider as _ApolloProvider } from "@apollo/client";
import { createApolloClient } from "~/helpers/apollo";

export type ApolloProviderProps = PropsWithChildren;

const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  const client = useMemo(createApolloClient, []);
  return <_ApolloProvider {...{ client }}>{children}</_ApolloProvider>;
};

export default ApolloProvider;
