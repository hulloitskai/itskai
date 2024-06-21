interface MiniProfiler {
  pageTransition: () => void;
}

declare global {
  interface Window {
    MiniProfiler?: MiniProfiler;
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
