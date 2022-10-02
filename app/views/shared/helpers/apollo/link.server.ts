import { ApolloLink, HttpLink } from "@apollo/client";

export const createApolloLink = (): ApolloLink => {
  return new HttpLink({
    fetch: () =>
      new Promise(() => {
        // Do nothing.
      }),
  });
};
