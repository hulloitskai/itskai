export const useIsStandaloneMode = (): boolean | undefined => {
  const mounted = useMounted();
  const standalone = useMediaQuery("(display-mode: standalone)");
  if (mounted) {
    return standalone;
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
