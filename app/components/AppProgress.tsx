import type { FC } from "react";
import { router } from "@inertiajs/react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

import "@mantine/nprogress/styles.layer.css";

export type AppProgressProps = {};

// TODO: On Safari, sometimes the progress bar looks like its "rolling back"
// when it resets. Maybe raise an issue in the Mantine repo?
const AppProgress: FC<AppProgressProps> = () => {
  useEffect(() => {
    const removeStartListener = router.on("start", () => {
      nprogress.start();
    });
    const removeFinishListener = router.on("finish", () => {
      nprogress.complete();
    });
    return () => {
      removeStartListener();
      removeFinishListener();
    };
  }, []);
  return <NavigationProgress size={1} />;
};

export default AppProgress;
