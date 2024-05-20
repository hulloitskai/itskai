import { useCallback } from "react";
import { isUndefined, omitBy } from "lodash-es";
import type { ApolloError } from "@apollo/client";

import ApolloErrorMessage from "~/components/ApolloErrorMessage";

import { formatJSON } from "~/helpers/json";
import { showAlert } from "~/helpers/notifications";

export const useApolloAlertCallback = (
  title: string,
  context: Record<string, any> = {},
): ((error: ApolloError) => void) => {
  const router = useRouter();
  return useCallback(
    error => {
      console.error(
        title,
        formatJSON(omitBy({ ...context, error }, isUndefined)),
      );
      const graphQLErrorWithRedirect = error.graphQLErrors.find(
        error => "redirect" in error.extensions,
      );
      if (graphQLErrorWithRedirect) {
        const redirectUrl = graphQLErrorWithRedirect.extensions["redirect"];
        invariant(typeof redirectUrl === "string", "Invalid redirect URL");
        router.visit(redirectUrl, {
          onFinish: () => {
            showAlert({
              message: graphQLErrorWithRedirect.message,
            });
          },
        });
      } else {
        showAlert({
          title,
          message: <ApolloErrorMessage>{error}</ApolloErrorMessage>,
        });
      }
    },
    [title, context, router],
  );
};
