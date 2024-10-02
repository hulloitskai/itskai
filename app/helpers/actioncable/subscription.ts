export interface SubscriptionOptions<Data> {
  descriptor: string;
  skip?: boolean;
  failSilently?: boolean;
  params?: Record<string, any>;
  onData?: (data: Data) => void;
  onError?: (error: Error) => void;
}

export interface Subscription<Data> {
  data?: Data;
  error?: Error;
}

export const useSubscription = <Data>(
  channel: string,
  {
    descriptor,
    params,
    skip,
    failSilently,
    onData,
    onError,
  }: SubscriptionOptions<Data>,
): Subscription<Data> => {
  const cable = useCable();
  const [subscription, setSubscription] = useState<Subscription<Data>>(
    () => ({}),
  );
  const onDataRef = useRef(onData);
  const onErrorRef = useRef(onError);
  useDidUpdate(() => {
    onDataRef.current = onData;
  }, [onData]);
  useDidUpdate(() => {
    onErrorRef.current = onError;
  }, [onError]);
  useEffect(() => {
    if (!cable) {
      return;
    }
    if (!skip) {
      const subscription = cable.subscriptions.create(
        { channel, ...params },
        {
          received: data => {
            if (data.error) {
              const error = new Error(data.error);
              setSubscription(subscription => ({
                ...subscription,
                error,
              }));
              console.error(`Failed to ${descriptor}`, error);
              if (!failSilently) {
                showAlert({
                  title: `Failed to ${descriptor}`,
                  message: data.error,
                });
              }
              onErrorRef.current?.(error);
            } else {
              setSubscription(subscription => ({
                ...subscription,
                data,
              }));
              onDataRef.current?.(data);
            }
          },
        },
      );
      return () => {
        subscription.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cable, channel, descriptor, failSilently, skip]);
  return subscription;
};
