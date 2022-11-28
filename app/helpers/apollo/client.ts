import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import type {
  NormalizedCacheObject,
  ApolloLink,
  ApolloCache,
} from "@apollo/client";

import { createApolloLink } from "./link?client";
import { possibleTypes, typePolicies } from "./types";

export type ApolloClientOptions = {
  readonly cache?: ApolloCache<NormalizedCacheObject>;
  readonly csrfToken: string;
};

export const createApolloClient = ({
  cache = createApolloCache(),
  csrfToken,
}: ApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  const link: ApolloLink = import.meta.env.SSR
    ? createDummyLink()
    : createApolloLink({ csrfToken });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: true,

        // The first time a browser-side `watchQuery` is run, attempt to load
        // data from the cache, before making a network request.
        fetchPolicy: "cache-first",
      },
    },
  });
};

export const createApolloCache = (): ApolloCache<NormalizedCacheObject> =>
  new InMemoryCache({ possibleTypes, typePolicies });

const createDummyLink = (): ApolloLink => {
  return new HttpLink({
    fetch: () =>
      new Promise(() => {
        // Do nothing.
      }),
  });
};
