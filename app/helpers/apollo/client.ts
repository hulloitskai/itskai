import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import type { NormalizedCacheObject } from "@apollo/client";

import { possibleTypes, typePolicies } from "./types";

export type ApolloClientOptions = {
  readonly link: ApolloLink;
};

export const createApolloClient = ({
  link,
}: ApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache({ possibleTypes, typePolicies }),
    link,
    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: true,
      },
    },
  });
};
