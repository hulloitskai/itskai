import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  SpotifyCurrentlyPlaying: {
    keyFields: false,
  },
  SpotifyLyricLine: {
    keyFields: false,
  },
};

export const { possibleTypes } = introspection;
