import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import type { NormalizedCacheObject, ApolloLink } from "@apollo/client";

import { createApolloLink } from "./link?client";

export type ApolloClientOptions = {
  readonly csrfToken: string;
};

export const createApolloClient = ({
  csrfToken,
}: ApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  let link: ApolloLink | undefined = undefined;
  if (import.meta.env.SSR) {
    link = new HttpLink({
      fetch: () =>
        new Promise(() => {
          // Do nothing.
        }),
    });
  } else {
    link = createApolloLink({ csrfToken });
  }
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache: new InMemoryCache({}),
    defaultOptions: {
      watchQuery: {
        // The first time a browser-side `watchQuery` is run, attempt to load
        // data from the cache, before making a network request.
        fetchPolicy: "cache-first",
      },
    },
  });
};
