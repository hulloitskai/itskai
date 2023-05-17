import type { FC } from "react";
import { router } from "@inertiajs/react";

import {
  NavigationProgress,
  completeNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";

const AppProgress: FC = () => {
  const theme = useMantineTheme();
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
  return (
    <NavigationProgress
      autoReset
      size={1}
      color={theme.colors[theme.primaryColor]![3]}
    />
  );
};

export default AppProgress;
