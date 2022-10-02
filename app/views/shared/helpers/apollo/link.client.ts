import ReactOnRails from "react-on-rails";

import { ApolloLink, HttpLink } from "@apollo/client";
import { split, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { getOperationDefinition } from "@apollo/client/utilities";

import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { cable } from "~views/shared/helpers/actioncable";
import { requireMeta } from "~views/shared/helpers/meta";

export const createApolloLink = (): ApolloLink => {
  return from([new RetryLink(), createCsrfLink(), createTerminatingLink()]);
};

const createTerminatingLink = (): ApolloLink => {
  const httpLink = createHttpLink();
  return createSubscriptionsLink(httpLink);
};

const createHttpLink = () => {
  const uri = requireMeta("graphql-url");
  return new HttpLink({ uri });
};

export const createSubscriptionsLink = (link: ApolloLink): ApolloLink => {
  const cableLink = new ActionCableLink({
    cable,
    channelName: "GraphqlChannel",
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

const createCsrfLink = (): ApolloLink => {
  return setContext(async (operation, { headers }) => ({
    headers: ReactOnRails.authenticityHeaders(headers),
  }));
};
