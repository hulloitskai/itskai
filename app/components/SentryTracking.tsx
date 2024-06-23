import { setUser, isInitialized } from "@sentry/react";

const SentryTracking: FC = () => {
  const { currentUser } = usePageProps();

  // == Current user tracking
  useEffect(() => {
    if (isInitialized()) {
      if (currentUser) {
        const { id, email } = currentUser;
        setUser({ id, email });
      } else {
        setUser(null);
      }
    }
  }, [currentUser]);

  return null;
};

export default SentryTracking;
