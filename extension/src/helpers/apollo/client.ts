import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client/index";
import type { NormalizedCacheObject } from "@apollo/client";

import { possibleTypes, typePolicies } from "./types";

export type ApolloClientOptions = {
  readonly link: ApolloLink;
};

export const createApolloClient = ({
  link,
}: ApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache({ possibleTypes, typePolicies }),
    link,
    defaultOptions: {
      query: {
        notifyOnNetworkStatusChange: true,
        partialRefetch: true,
      },
      watchQuery: {
        notifyOnNetworkStatusChange: true,
        partialRefetch: true,
      },
    },
  });
};
