import { useDocumentVisibility, useMediaQuery } from "@mantine/hooks";
import { useMounted } from "@mantine/hooks";

export const useIsStandalone = (): boolean | undefined => {
  const mounted = useMounted();
  const isStandalone = useMediaQuery("(display-mode: standalone)");
  if (mounted) {
    return isStandalone;
  }
};

export const useInstallPromptEvent = (): Event | null => {
  const [event, setEvent] = useState<Event | null>(null);
  useEffect(() => {
    const capturedEvent = window.installPromptEvent;
    if (capturedEvent) {
      setEvent(capturedEvent);
    }
    addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      setEvent(event);
    });
    return () => {
      removeEventListener("beforeinstallprompt", setEvent);
    };
  }, []);
  return event;
};

export const useClearAppBadge = () => {
  const isStandalone = useIsStandalone();
  const visibility = useDocumentVisibility();
  useEffect(() => {
    if (
      isStandalone &&
      visibility === "visible" &&
      "clearAppBadge" in navigator
    ) {
      void navigator.clearAppBadge();
    }
  }, [isStandalone, visibility]);
};
