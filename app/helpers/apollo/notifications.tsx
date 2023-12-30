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
      context = omitBy({ ...context, error }, isUndefined);
      console.error(title, formatJSON(context));
      showAlert({
        title,
        message: <ApolloErrorMessage>{error}</ApolloErrorMessage>,
      });
    },
    [title],
  );
};
