import type { FC, PropsWithChildren } from "react";
import { router } from "@inertiajs/react";

import { ApolloProvider as _ApolloProvider } from "@apollo/client";
import { createApolloClient, createApolloLink } from "~/helpers/apollo";

export type ApolloProviderProps = PropsWithChildren<{
  readonly csrfToken: string;
}>;

const ApolloProvider: FC<ApolloProviderProps> = ({ csrfToken, children }) => {
  const link = useMemo(() => createApolloLink({ csrfToken }), [csrfToken]);
  const [client] = useState(() => createApolloClient({ link }));
  useDidUpdate(() => client.setLink(link), [client, link]);
  useEffect(() => {
    return router.on("success", () => {
      client.resetStore();
    });
  }, [client]);
  return <_ApolloProvider {...{ client }}>{children}</_ApolloProvider>;
};

export default ApolloProvider;
