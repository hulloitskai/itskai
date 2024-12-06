import Clarity from "@microsoft/clarity";

const ClarityTracking: FC = () => {
  const {
    component,
    props: { currentUser },
  } = usePage();

  // == Current user tracking
  useShallowEffect(() => {
    if (currentUser) {
      const { id, name } = currentUser;
      if ("clarity" in window) {
        Clarity.identify(id, undefined, component, name);
      }
    }
  }, [currentUser, component]);

  return null;
};

export default ClarityTracking;
