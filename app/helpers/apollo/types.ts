import { relayStylePagination } from "@apollo/client/utilities";

import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      obsidianNotes: relayStylePagination(["modifiedAfter", "modifiedBefore"]),
    },
  },
};

export const { possibleTypes } = introspection;
