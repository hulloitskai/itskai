import { empty as emptyLink } from "@apollo/client";
import type { ApolloLink } from "@apollo/client";

import { createClientLink } from "~/helpers/apollo/clientLink?client";

export type ApolloLinkOptions = {
  readonly csrfToken: string;
};

export const createApolloLink = ({
  csrfToken,
}: ApolloLinkOptions): ApolloLink => {
  return import.meta.env.SSR ? emptyLink() : createClientLink({ csrfToken });
};
