import { useIsFirstRender, useNetwork } from "@mantine/hooks";
import { type Subscription } from "@rails/actioncable";
import { type SWRConfiguration } from "swr";
import useSWRSubscription, {
  type SWRSubscriptionResponse,
} from "swr/subscription";

import { useCable } from ".";

export interface UseSubscriptionOptions<Data> extends SWRConfiguration {
  descriptor: string;
  failSilently?: boolean;
  params?: Record<string, any> | null;
  onConnected?: () => void;
  onData?: (data: Data) => void;
  onError?: (error: Error) => void;
}

export interface SubscriptionResponse<Data>
  extends SWRSubscriptionResponse<Data, Error> {
  subscription: Subscription | undefined;
}

export const useSubscription = <
  Data extends Record<string, any> & { error?: never },
>(
  channel: string,
  options?: UseSubscriptionOptions<Data>,
): SubscriptionResponse<Data> => {
  const cable = useCable();
  const {
    params,
    descriptor,
    failSilently,
    onConnected,
    onData,
    onError,
    ...swrConfiguration
  } = options ?? {};

  // == Key
  const computeKey = useCallback(
    (
      channel: string,
      params: UseSubscriptionOptions<Data>["params"],
    ): { channel: string; [param: string]: any } | null =>
      params === null ? null : { channel, ...params },
    [],
  );
  const [key, setKey] = useState(() => computeKey(channel, params));
  const isFirstRender = useIsFirstRender();
  useShallowEffect(() => {
    if (!isFirstRender) {
      setKey(computeKey(channel, params));
    }
  }, [channel, params]); // eslint-disable-line react-hooks/exhaustive-deps

  // == SWR
  const { online } = useNetwork();
  const { data: swrData, error } = useSWRSubscription<
    { subscription?: Subscription; data?: Data },
    Error,
    typeof key
  >(
    cable ? key : null,
    (params, { next }) => {
      invariant(cable);
      const subscription = cable.subscriptions.create(params, {
        connected: () => {
          next(undefined, { subscription });
        },
        rejected: () => {
          const error = new Error(
            `Failed to ${descriptor}: connection rejected`,
          );
          console.error(error);
          next(error);
        },
        received: (data: Data | { error?: string }) => {
          if ("error" in data) {
            const error = new Error(data.error);
            console.error(`Failed to ${descriptor}`, error);
            if (!failSilently) {
              toast.error(`Failed to ${descriptor}`, {
                description: data.error,
              });
            }
            next(error, { subscription });
          } else {
            const nonErrorData = data as Data;
            next(undefined, { subscription, data: nonErrorData });
          }
        },
      });
      return () => {
        next(undefined, {});
        subscription.unsubscribe();
      };
    },
    {
      isOnline: () => online,
      ...swrConfiguration,
    },
  );
  const { subscription, data } = swrData ?? {};
  useDidUpdate(() => {
    if (subscription) {
      onConnected?.();
    }
  }, [subscription]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data) {
      onData?.(data);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps
  return { subscription, data, error };
};
