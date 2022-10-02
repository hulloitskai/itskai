import React from "react";
import { showNotification } from "@mantine/notifications";
import { ApolloError } from "@apollo/client";

import { formatApolloError } from "~views/shared/helpers/apollo";

export const useErrorCallback = (
  title?: string,
): ((error: ApolloError) => void) => {
  return useCallback(
    error => {
      const message = formatApolloError(error);
      showNotification({
        color: "red",
        icon: <IconHeroExclamationTriangle20Solid />,
        title,
        message,
      });
    },
    [showNotification, title],
  );
};
