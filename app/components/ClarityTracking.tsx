const ClarityTracking: FC = () => {
  const {
    component,
    props: { currentUser },
  } = usePage();

  // == Current user tracking
  useEffect(() => {
    if (clarity && currentUser) {
      const { id, name } = currentUser;
      clarity("identify", id, undefined, component, name);
    }
  }, [currentUser?.id, component]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default ClarityTracking;
