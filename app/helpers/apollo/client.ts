import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import type { NormalizedCacheObject, ApolloLink } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

import { createApolloLink } from "./link?client";

import { StrictTypedTypePolicies } from "./helpers";

import introspection from "./introspection";
const { possibleTypes } = introspection;

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      obsidianNotes: relayStylePagination(["modifiedAfter", "modifiedBefore"]),
    },
  },
};

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
    cache: new InMemoryCache({ possibleTypes, typePolicies }),
    defaultOptions: {
      watchQuery: {
        // The first time a browser-side `watchQuery` is run, attempt to load
        // data from the cache, before making a network request.
        fetchPolicy: "cache-first",
      },
    },
  });
};
