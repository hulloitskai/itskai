import type { FC } from "react";

const PageTracking: FC = () => {
  const { component } = usePage();

  // == FullStory
  useEffect(() => {
    if (isFSInitialized()) {
      setFSVars("page", {
        pageName: component,
      });
    }
  }, [component]);

  return null;
};

export default PageTracking;
