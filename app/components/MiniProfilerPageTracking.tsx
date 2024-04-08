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
  const router = useRouter();
  useEffect(() => {
    return router.on("start", () => {
      window.MiniProfiler?.pageTransition();
    });
  }, [router]);
  return null;
};

export default MiniProfilerPageTracking;
