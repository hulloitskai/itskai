import { isInitialized, setUser } from "@sentry/react";

const SentryTracking: FC = () => {
  const currentUser = useCurrentUser();

  // == Current user tracking
  useEffect(() => {
    if (isInitialized()) {
      if (currentUser) {
        const { email, id } = currentUser;
        setUser({ id, email });
      } else {
        setUser(null);
      }
    }
  }, [currentUser]);

  return null;
};

export default SentryTracking;
