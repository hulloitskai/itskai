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
  return useCallback(
    error => {
      console.error(
        title,
        formatJSON(omitBy({ ...context, error }, isUndefined)),
      );
      showAlert({
        title,
        message: <ApolloErrorMessage>{error}</ApolloErrorMessage>,
      });
    },
    [title, context],
  );
};
