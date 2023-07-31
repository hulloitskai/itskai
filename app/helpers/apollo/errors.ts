import type { ApolloError, ServerError } from "@apollo/client";
import { first } from "lodash-es";

import { formatError } from "~/helpers/errors";

export const formatApolloError = (error: ApolloError): string => {
  const { graphQLErrors, networkError, message } = error;
  const graphQLError = first(graphQLErrors);
  if (graphQLError) {
    return formatError(graphQLError);
  }
  if (networkError) {
    if ((networkError as ServerError | undefined)?.statusCode === 500) {
      return "An internal server error occurred.";
    }
  }
  return message;
};
