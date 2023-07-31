import { ApolloLink, HttpLink, split, from } from "@apollo/client/index";
import { RetryLink } from "@apollo/client/link/retry/index";
import { getOperationDefinition } from "@apollo/client/utilities/index";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { cable } from "~/helpers/actioncable";

export const createApolloLink = (): ApolloLink => {
  return from([new RetryLink(), createTerminatingLink()]);
};

const createTerminatingLink = (): ApolloLink => {
  const httpLink = createHttpLink();
  return createSubscriptionsLink(httpLink);
};

const createHttpLink = () => {
  const uri: string =
    import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql";
  return new HttpLink({ uri });
};

const createSubscriptionsLink = (link: ApolloLink): ApolloLink => {
  const cableLink = new ActionCableLink({
    cable,
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
