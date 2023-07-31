import { useCallback } from "react";
import { isUndefined, omitBy } from "lodash-es";
import type { ApolloError } from "@apollo/client";

import { formatJSON } from "~/helpers/json";
import { showAlert } from "~/helpers/notifications";

import { formatApolloError } from "./errors";

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
