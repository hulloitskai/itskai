import { type User } from "~/types";

export const useCurrentUser = (): User | null => {
  const { currentUser } = usePageProps();
  return currentUser;
};

export const useAuthenticatedUser = (): User => {
  const currentUser = useCurrentUser();
  if (!currentUser) {
    throw new Error("Missing current user");
  }
  return currentUser;
};
