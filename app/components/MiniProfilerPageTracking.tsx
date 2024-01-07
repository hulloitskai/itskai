import { router } from "@inertiajs/react";
import type { FC } from "react";

type MiniProfiler = {
  pageTransition: () => void;
};

declare global {
  interface Window {
    MiniProfiler: MiniProfiler | undefined;
  }
}

const MiniProfilerPageTracking: FC = () => {
  useEffect(() => {
    return router.on("start", () => {
      window.MiniProfiler?.pageTransition();
    });
  }, []);
  return null;
};

export default MiniProfilerPageTracking;
