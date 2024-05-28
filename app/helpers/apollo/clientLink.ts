import { ApolloLink, HttpLink, from, split } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { getOperationDefinition } from "@apollo/client/utilities";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { getCable } from "~/helpers/actioncable";
import { requireMeta, getMeta } from "~/helpers/meta";

export type ClientLinkOptions = {
  readonly initialCSRFToken: string;
};

export const createClientLink = ({
  initialCSRFToken,
}: ClientLinkOptions): ApolloLink => {
  return from([createCSRFLink(initialCSRFToken), createTerminatingLink()]);
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
      console.warn("Missing CSRF meta tags; falling back to initial token");
    }
    return {
      headers: {
        ...headers,
        ["X-CSRF-Token"]: currentToken ?? initialToken,
      },
    };
  });
};
