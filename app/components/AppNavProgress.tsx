import { router } from "@inertiajs/react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

import "@mantine/nprogress/styles.layer.css";
import classes from "./AppNavProgress.module.css";

export interface AppNavProgressProps {}

// TODO: On Safari, sometimes the progress bar looks like its "rolling back"
// when it resets. Maybe raise an issue in the Mantine repo?
const AppNavProgress: FC<AppNavProgressProps> = () => {
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
  return <NavigationProgress className={classes.root} />;
};

export default AppNavProgress;
