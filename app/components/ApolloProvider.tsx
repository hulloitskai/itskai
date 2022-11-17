import type { FC } from "react";

import { ApolloProvider as _ApolloProvider } from "@apollo/client";
import { createApolloClient } from "~/helpers/apollo";

import type { ProviderProps } from "~/helpers/inertia";

export type ApolloProviderProps = ProviderProps;

const ApolloProvider: FC<ApolloProviderProps> = ({ page, children }) => {
  const {
    csrf: { token: csrfToken },
  } = page.props;
  const client = useMemo(() => createApolloClient({ csrfToken }), []);
  return <_ApolloProvider {...{ client }}>{children}</_ApolloProvider>;
};

export default ApolloProvider;
