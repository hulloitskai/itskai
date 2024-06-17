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
              onError?.(error);
            } else {
              setSubscription(subscription => ({
                ...subscription,
                data,
              }));
              onData?.(data);
            }
          },
        },
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [cable, channel, descriptor, failSilently, onData, onError, params, skip]);
  return subscription;
};
