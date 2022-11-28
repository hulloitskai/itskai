import type { FC } from "react";

import { ApolloProvider as _ApolloProvider } from "@apollo/client";
import { createApolloClient, createApolloCache } from "~/helpers/apollo";

import type { ProviderProps } from "~/helpers/inertia";

export type ApolloProviderProps = ProviderProps;

const ApolloProvider: FC<ApolloProviderProps> = ({
  page: {
    props: {
      csrf: { token: csrfToken },
    },
  },
  children,
}) => {
  const cache = useMemo(createApolloCache, []);
  const client = useMemo(() => {
    return createApolloClient({ cache, csrfToken });
  }, [cache, csrfToken]);
  return <_ApolloProvider {...{ client }}>{children}</_ApolloProvider>;
};

export default ApolloProvider;
