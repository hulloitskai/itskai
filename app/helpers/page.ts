const useVisibilityChangeSubscribe = (callback: () => void) => {
  document.addEventListener("visibilitychange", callback);
  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};

export const usePageVisibilityChange = (
  initialValue: DocumentVisibilityState,
): boolean => {
  const visibilityState = useSyncExternalStore(
    useVisibilityChangeSubscribe,
    () => document.visibilityState,
    () => initialValue,
  );
  return visibilityState === "visible";
};
