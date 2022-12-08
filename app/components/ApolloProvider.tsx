import type { FC } from "react";
import type { ProviderProps } from "~/helpers/inertia";

import { ApolloProvider as _ApolloProvider } from "@apollo/client";

import { createApolloClient, createApolloLink } from "~/helpers/apollo";

export type ApolloProviderProps = ProviderProps;

const ApolloProvider: FC<ApolloProviderProps> = ({
  page: {
    props: {
      csrf: { token: csrfToken },
    },
  },
  children,
}) => {
  const link = useMemo(() => createApolloLink({ csrfToken }), [csrfToken]);
  const client = useMemo(() => createApolloClient({ link }), []);
  useEffect(() => {
    if (client.link !== link) {
      client.setLink(link);
    }
  }, [link]);
  return <_ApolloProvider {...{ client }}>{children}</_ApolloProvider>;
};

export default ApolloProvider;
