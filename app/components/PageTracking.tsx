import type { FC } from "react";

const PageTracking: FC = () => {
  const { component } = usePage();

  // == FullStory
  useEffect(() => {
    if (isFsInitialized()) {
      setFsVars("page", {
        pageName: component,
      });
    }
  }, [component]);

  return null;
};

export default PageTracking;
