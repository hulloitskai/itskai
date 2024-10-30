import useSWRSubscription, {
  type SWRSubscriptionResponse,
} from "swr/subscription";

export interface UseSubscriptionOptions<Data> {
  descriptor: string;
  failSilently?: boolean;
  params?: Record<string, any> | null;
  onData?: (data: Data) => void;
  onError?: (error: Error) => void;
}

export type SubscriptionResponse<Data> = SWRSubscriptionResponse<Data, Error>;

export const useSubscription = <
  Data extends Record<string, any> & { error?: never },
>(
  channel: string,
  options?: UseSubscriptionOptions<Data>,
): SubscriptionResponse<Data> => {
  const cable = useCable();
  const { params, descriptor, failSilently, onData, onError } = options ?? {};
  const computeKey = useCallback(
    (
      channel: string,
      params: UseSubscriptionOptions<Data>["params"],
    ): { channel: string; [param: string]: any } | null =>
      params === null ? null : { channel, ...params },
    [],
  );
  const [key, setKey] = useState(() => computeKey(channel, params));
  const firstRenderRef = useRef(true);
  useShallowEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      setKey(computeKey(channel, params));
    }
  }, [computeKey, channel, params]);
  return useSWRSubscription(cable ? key : null, (params, { next }) => {
    invariant(cable);
    const subscription = cable.subscriptions.create(params, {
      received: (data: Data | { error?: string }) => {
        if ("error" in data) {
          const error = new Error(data.error);
          console.error(`Failed to ${descriptor}`, error);
          if (!failSilently) {
            toast.error(`Failed to ${descriptor}`, {
              description: data.error,
            });
          }
          onError?.(error);
          next(error);
        } else {
          const nonErrorData = data as Data;
          onData?.(nonErrorData);
          next(undefined, nonErrorData);
        }
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  });
};
