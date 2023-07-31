import { ApolloClient, InMemoryCache } from "@apollo/client/index";
import type { NormalizedCacheObject } from "@apollo/client";

import { createApolloLink } from "./link";
import { possibleTypes, typePolicies } from "./types";

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache({ possibleTypes, typePolicies }),
    link: createApolloLink(),
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
