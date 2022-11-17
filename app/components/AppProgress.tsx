import type { FC } from "react";
import { Inertia } from "@inertiajs/inertia";

import { NavigationProgress } from "@mantine/nprogress";
import {
  startNavigationProgress,
  completeNavigationProgress,
} from "@mantine/nprogress";

const AppProgress: FC = () => {
  const onStart = useCallback(() => startNavigationProgress(), []);
  const onFinish = useCallback(() => completeNavigationProgress(), []);
  useEffect(() => {
    const removeStartListener = Inertia.on("start", onStart);
    const removeFinishListener = Inertia.on("finish", onFinish);
    return () => {
      removeStartListener();
      removeFinishListener();
    };
  }, []);
  return <NavigationProgress color="indigo" size={1} />;
};

export default AppProgress;
