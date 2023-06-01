import { relayStylePagination } from "@apollo/client/utilities/index";

import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  NotionPageListing: {
    keyFields: false,
  },
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
