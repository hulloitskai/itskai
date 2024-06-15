export interface SubscriptionOptions<Data> {
  params?: Record<string, any>;
  transformData?: (data: unknown) => Data;
  onData?: (data: Data) => void;
}

export interface Subscription<Data> {
  data: Data | null;
}

export const useSubscription = <Data>(
  channel: string,
  options?: SubscriptionOptions<Data>,
): Subscription<Data> => {
  const { params, transformData = deepCamelizeKeys, onData } = options ?? {};
  const cable = useCable();
  const [subscription, setSubscription] = useState<Subscription<Data>>(() => ({
    data: null,
  }));
  useEffect(() => {
    if (!cable) {
      return;
    }
    const subscription = cable.subscriptions.create(
      { channel, ...params },
      {
        received: data => {
          const transformedData = transformData(data) as Data;
          setSubscription(subscription => ({
            ...subscription,
            data: transformedData,
          }));
          onData?.(transformedData);
        },
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [cable, channel, onData, params, transformData]);
  return subscription;
};
