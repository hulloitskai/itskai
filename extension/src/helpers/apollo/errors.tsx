// import type { ApolloError, ServerError } from "@apollo/client";
// import { first } from "lodash-es";

// export const formatApolloError = (error: ApolloError): string => {
//   const { graphQLErrors, networkError, message } = error;
//   const graphQLError = first(graphQLErrors);
//   if (graphQLError) {
//     return formatError(graphQLError);
//   }
//   if (networkError) {
//     if ((networkError as ServerError | undefined)?.statusCode === 500) {
//       return "An internal server error occurred.";
//     }
//   }
//   return message;
// };

// export const useApolloAlertCallback = (
//   title: string,
// ): ((error: ApolloError) => void) => {
//   return useCallback(
//     error => {
//       const message = formatApolloError(error);
//       console.error(title, { error });
//       showAlert({ title, message });
//     },
//     [title],
//   );
// };
