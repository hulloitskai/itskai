import { relayStylePagination } from "@apollo/client/utilities";

import introspection from "./introspection";
import type { StrictTypedTypePolicies } from "./helpers";

export const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      obsidianNotes: relayStylePagination(["modifiedAfter", "modifiedBefore"]),
    },
  },
};

export const { possibleTypes } = introspection;
