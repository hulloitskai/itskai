import { useCallback } from "react";
import type { ApolloError, ServerError } from "@apollo/client";
import { isUndefined, omitBy } from "lodash-es";

import { formatJSON } from "~/helpers/utils";
import { showAlert } from "~/helpers/notifications";

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

export const useApolloAlertCallback = (
  title: string,
  context: Record<string, any> = {},
): ((error: ApolloError) => void) => {
  return useCallback(
    error => {
      const message = formatApolloError(error);
      context = omitBy({ ...context, error }, isUndefined);
      console.error(title, formatJSON(context));
      showAlert({ title, message });
    },
    [title],
  );
};
