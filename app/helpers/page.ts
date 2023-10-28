import { useVisibilityChange } from "@uidotdev/usehooks";

export const usePageVisibilityChange = (initialValue: boolean): boolean => {
  if (import.meta.env.SSR) {
    return initialValue;
  }
  try {
    return useVisibilityChange(); // eslint-disable-line react-hooks/rules-of-hooks
  } catch (error) {
    if (
      error instanceof Error &&
      error.message == "useVisibilityChange is a client-only hook"
    ) {
      return initialValue;
    }
    throw error;
  }
};
