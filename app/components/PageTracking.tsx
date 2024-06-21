const PageTracking: FC = () => {
  const { component } = usePage();

  // == FullStory
  useEffect(() => {
    if (isFsInitialized()) {
      FullStory("setPage", { pageName: component });
    }
  }, [component]);

  return null;
};

export default PageTracking;
