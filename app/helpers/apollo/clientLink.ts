// import type { ServerError } from "@apollo/client";
import { ApolloLink, HttpLink, from, split } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
// import { RetryLink } from "@apollo/client/link/retry";
import { getOperationDefinition } from "@apollo/client/utilities";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { getCable } from "~/helpers/actioncable";
import { requireMeta } from "~/helpers/meta";

export type ClientLinkOptions = {
  readonly initialCSRFToken: string;
};

export const createClientLink = ({
  initialCSRFToken,
}: ClientLinkOptions): ApolloLink => {
  return from([
    // new RetryLink({
    //   attempts: {
    //     retryIf: (error: ApolloError) => {
    //       if (error.name === "ServerError") {
    //         const { statusCode } = error as ServerError;
    //         if (statusCode === 500) {
    //           return false;
    //         }
    //       }
    //       return true;
    //     },
    //   },
    // }),
    createCSRFLink(initialCSRFToken),
    createTerminatingLink(),
  ]);
};

const createTerminatingLink = (): ApolloLink => {
  const httpLink = createHttpLink();
  return createSubscriptionsLink(httpLink);
};

const createHttpLink = () => {
  const uri = requireMeta("graphql-url");
  return new HttpLink({ uri });
};

const createSubscriptionsLink = (link: ApolloLink): ApolloLink => {
  const cableLink = new ActionCableLink({
    cable: getCable(),
    channelName: "GraphQLChannel",
  });
  return split(
    ({ query }) => {
      const { operation } = getOperationDefinition(query) || {};
      return operation === "subscription";
    },
    cableLink,
    link,
  );
};

const createCSRFLink = (initialToken: string): ApolloLink => {
  return setContext(async (operation, { headers }) => {
    const currentToken = getMeta("csrf-token");
    if (!import.meta.env.SSR && !currentToken) {
      console.warn("No client-side CSRF token found");
    }
    return {
      headers: {
        ...headers,
        ["X-CSRF-Token"]: currentToken ?? initialToken,
      },
    };
  });
};
