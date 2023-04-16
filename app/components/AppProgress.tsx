import type { FC } from "react";
import { router } from "@inertiajs/react";

import {
  NavigationProgress,
  completeNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";

const AppProgress: FC = () => {
  useEffect(() => {
    const removeStartListener = router.on("start", () =>
      startNavigationProgress(),
    );
    const removeFinishListener = router.on("finish", () =>
      completeNavigationProgress(),
    );
    return () => {
      removeStartListener();
      removeFinishListener();
    };
  }, []);
  return <NavigationProgress autoReset color="pink.4" size={1} />;
};

export default AppProgress;
