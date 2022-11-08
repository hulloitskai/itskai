export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  if (typeof window !== "undefined") {
    useEffect(() => {
      if (!mounted) {
        setMounted(true);
      }
    }, []);
  }
  return mounted;
};
