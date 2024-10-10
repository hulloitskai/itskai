const ClarityTracking: FC = () => {
  const {
    component,
    props: { currentUser },
  } = usePage();

  // == Current user tracking
  useShallowEffect(() => {
    if (typeof clarity !== "undefined" && currentUser) {
      const { id, name } = currentUser;
      clarity("identify", id, undefined, component, name);
    }
  }, [currentUser, component]);

  return null;
};

export default ClarityTracking;
