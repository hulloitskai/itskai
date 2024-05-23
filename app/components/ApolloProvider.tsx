import type { FC, PropsWithChildren } from "react";
import { router } from "@inertiajs/react";

import { ApolloProvider as _ApolloProvider } from "@apollo/client";
import { createApolloClient, createApolloLink } from "~/helpers/apollo";

export type ApolloProviderProps = PropsWithChildren<{
  readonly initialCSRFToken: string;
}>;

const ApolloProvider: FC<ApolloProviderProps> = ({
  initialCSRFToken,
  children,
}) => {
  const [client] = useState(() => {
    const link = createApolloLink({ initialCSRFToken });
    return createApolloClient({ link });
  });
  useEffect(() => {
    return router.on("success", () => {
      client.resetStore();
    });
  }, [client]);
  return <_ApolloProvider {...{ client }}>{children}</_ApolloProvider>;
};

export default ApolloProvider;
