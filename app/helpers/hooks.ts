export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  if (!import.meta.env.SSR) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!mounted) {
        setMounted(true);
      }
    }, []);
  }
  return mounted;
};

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
