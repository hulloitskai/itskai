import type { ApolloError, ServerError } from "@apollo/client";

import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";

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

export const useApolloErrorCallback = (
  title?: string,
): ((error: ApolloError) => void) => {
  return useCallback(
    error => {
      const message = formatApolloError(error);
      showNotification({
        color: "red",
        icon: <ExclamationTriangleIcon />,
        title,
        message,
      });
    },
    [showNotification, title],
  );
};
