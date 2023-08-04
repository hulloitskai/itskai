import introspection from "./introspection.generated";
import type { StrictTypedTypePolicies } from "./clientHelpers.generated";

export const typePolicies: StrictTypedTypePolicies = {
  CurrentlyPlaying: {
    keyFields: false,
  },
  LyricLine: {
    keyFields: false,
  },
};

export const { possibleTypes } = introspection;
