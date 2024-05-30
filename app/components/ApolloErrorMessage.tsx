import type { FC } from "react";
import type { ApolloError, ServerError } from "@apollo/client";
import { formatError } from "~/helpers/errors";

export type ApolloErrorMessageProps = {
  children: ApolloError;
};

const ApolloErrorMessage: FC<ApolloErrorMessageProps> = ({ children }) => {
  const message = useMemo(() => {
    const { graphQLErrors, networkError, message } = children;
    const graphQLError = first(graphQLErrors);
    if (graphQLError) {
      return formatError(graphQLError);
    }
    if (networkError) {
      if (networkError.name === "ServerError") {
        const { statusCode } = networkError as ServerError;
        if (statusCode === 500) {
          const message = "An internal server error occurred.";
          if (requireMeta("env") === "development") {
            return (
              <>
                {message}{" "}
                <Anchor href="/__better_errors" target="_blank" inherit>
                  (view details)
                </Anchor>
              </>
            );
          }
          return message;
        }
      }
    }
    return message;
  }, [children]);
  return <>{message}</>;
};

export default ApolloErrorMessage;
