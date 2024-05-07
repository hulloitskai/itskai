import { empty as emptyLink } from "@apollo/client";
import type { ApolloLink } from "@apollo/client";

import { createClientLink } from "~/helpers/apollo/clientLink?client";

export type ApolloLinkOptions = {
  readonly initialCSRFToken: string;
};

export const createApolloLink = ({
  initialCSRFToken,
}: ApolloLinkOptions): ApolloLink => {
  return import.meta.env.SSR
    ? emptyLink()
    : createClientLink({ initialCSRFToken });
};
