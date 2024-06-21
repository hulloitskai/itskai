import { router } from "@inertiajs/react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

import "@mantine/nprogress/styles.layer.css";
import classes from "./AppProgress.module.css";

export interface AppProgressProps {}

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
  return <NavigationProgress className={classes.root} />;
};

export default AppProgress;
