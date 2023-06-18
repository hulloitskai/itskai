import { relayStylePagination } from "@apollo/client/utilities";

import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      obsidianNotes: relayStylePagination(["modifiedAfter", "modifiedBefore"]),
    },
  },
  SpotifyCurrentlyPlaying: {
    keyFields: false,
  },
  SpotifyLyricLine: {
    keyFields: false,
  },
};

export const { possibleTypes } = introspection;
