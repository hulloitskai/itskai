import { ApolloLink, HttpLink, from, split } from "@apollo/client/index";
import { setContext } from "@apollo/client/link/context/index";
import { RetryLink } from "@apollo/client/link/retry/index";
import { getOperationDefinition } from "@apollo/client/utilities/index";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { cable } from "~/helpers/actioncable";
import { requireMeta } from "~/helpers/meta";

export type ClientLinkOptions = {
  readonly csrfToken: string;
};

export const createClientLink = ({
  csrfToken,
}: ClientLinkOptions): ApolloLink => {
  return from([
    new RetryLink(),
    createCSRFLink(csrfToken),
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

const createCSRFLink = (token: string): ApolloLink => {
  return setContext(async (operation, { headers }) => ({
    headers: {
      ...headers,
      ["X-CSRF-Token"]: token,
    },
  }));
};
