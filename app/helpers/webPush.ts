import { createContext, useContext } from "react";

import { type PushSubscriptionRegistration } from "~/types";

import { type FetchRouteResponse } from "./fetch";
import { getOrRegisterServiceWorker } from "./serviceWorker";

const getPushManager = (): Promise<PushManager> =>
  getOrRegisterServiceWorker().then(({ pushManager }) => pushManager);

export const getPushSubscription = (): Promise<PushSubscription | null> =>
  getPushManager().then(pushManager => pushManager.getSubscription());

export interface UseWebPushResult {
  supported: boolean | undefined;
  subscription: PushSubscription | undefined | null;
  registration: PushSubscriptionRegistration | undefined | null;
  subscribed: boolean;
  subscribe: (friendToken?: string) => Promise<void>;
  subscribing: boolean;
  subscribeError: Error | null;
  unsubscribe: () => Promise<void>;
  unsubscribing: boolean;
  unsubscribeError: Error | null;
  loading: boolean;
}

export const WebPushContext = createContext<UseWebPushResult | null>(null);

export const useWebPush = (): UseWebPushResult => {
  const context = useContext(WebPushContext);
  if (!context) {
    throw new Error("useWebPush must be used within a WebPushProvider");
  }
  return context;
};

export const useWebPushSupported = (): boolean | undefined => {
  const [supported, setSupported] = useState<boolean | undefined>();
  useEffect(() => {
    setSupported(webPushSupported());
  }, []);
  return supported;
};

export const webPushSupported = (): boolean =>
  typeof window !== "undefined" && "Notification" in window;

export interface LookupPushSubscriptionRegistrationResponse
  extends Omit<FetchRouteResponse<any>, "data"> {
  registration: PushSubscriptionRegistration | undefined | null;
}

export const useLookupPushSubscriptionRegistration = (
  subscription: PushSubscription | undefined | null,
): LookupPushSubscriptionRegistrationResponse => {
  const { data, ...response } = useFetchRoute<{
    registration: PushSubscriptionRegistration | null;
  }>(routes.pushSubscriptions.lookup, {
    descriptor: "lookup push subscription registration",
    ...(subscription
      ? {
          data: {
            push_subscription: {
              endpoint: subscription.endpoint,
            },
          },
        }
      : {
          // This prevents the route from being called
          params: null,
        }),
  });
  const { registration } = data ?? {};
  return {
    registration: subscription === null ? null : registration,
    ...response,
  };
};

export interface UseWebPushSubscribeOptions {
  onSubscribed: (subscription: PushSubscription) => void;
}

export const useWebPushSubscribe = ({
  onSubscribed,
}: UseWebPushSubscribeOptions): [
  () => Promise<void>,
  { subscribing: boolean; subscribeError: Error | null },
] => {
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<Error | null>(null);
  const subscribe = useCallback(
    (friendToken?: string): Promise<void> => {
      const registerAndSubscribe = (): Promise<void> =>
        Promise.all<[Promise<PushManager>, Promise<string>]>([
          getPushManager(),
          fetchPublicKey(friendToken),
        ])
          .then(
            ([pushManager, publicKey]) =>
              pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: createApplicationServerKey(publicKey),
              }),
            (error: Error): never => {
              setSubscribeError(error);
              return reportProblem(error.message);
            },
          )
          .then(
            subscription => {
              const { endpoint, keys } = pick(
                subscription.toJSON(),
                "endpoint",
                "keys.auth",
                "keys.p256dh",
              );
              if (!keys?.auth) {
                return reportProblem("Missing auth key");
              }
              if (!keys?.p256dh) {
                return reportProblem("Missing p256dh key");
              }
              const query = friendToken ? { friend_token: friendToken } : {};
              return fetchRoute(routes.pushSubscriptions.create, {
                descriptor: "subscribe to push notifications",
                params: { query },
                data: {
                  push_subscription: {
                    endpoint,
                    auth_key: keys.auth,
                    p256dh_key: keys.p256dh,
                  },
                },
              }).then(() => {
                onSubscribed(subscription);
              });
            },
            (error: Error) => {
              setSubscribeError(error);
              toast.error("Couldn't subscribe to push notifications", {
                description: error.message,
              });
              throw error;
            },
          )
          .finally(() => {
            setSubscribing(false);
          });
      setSubscribing(true);
      if (Notification.permission === "granted") {
        return registerAndSubscribe();
      } else {
        return Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            return registerAndSubscribe();
          } else {
            setSubscribing(false);
          }
        });
      }
    },
    [onSubscribed],
  );
  return [subscribe, { subscribing, subscribeError }];
};

const reportProblem = (message: string): never => {
  toast.error("Something went wrong", {
    description: message,
  });
  console.error(message);
  throw new Error(message);
};

export interface UseWebPushUnsubscribeOptions {
  onUnsubscribed: () => void;
}

export const useWebPushUnsubscribe = ({
  onUnsubscribed,
}: UseWebPushUnsubscribeOptions): [
  () => Promise<void>,
  { unsubscribing: boolean; unsubscribeError: Error | null },
] => {
  const [unsubscribing, setUnsubscribing] = useState(false);
  const [unsubscribeError, setUnsubscribeError] = useState<Error | null>(null);
  const unsubscribe = useCallback((): Promise<void> => {
    setUnsubscribing(true);
    return getPushSubscription()
      .then(
        subscription => {
          if (!subscription) {
            return;
          }
          return fetchRoute(routes.pushSubscriptions.unsubscribe, {
            descriptor: "unsubscribe from push notifications",
            data: {
              push_subscription: {
                endpoint: subscription.endpoint,
              },
            },
          })
            .then(() => subscription.unsubscribe())
            .then(() => {
              onUnsubscribed();
            });
        },
        (error: Error) => {
          setUnsubscribeError(error);
          throw error;
        },
      )
      .finally(() => {
        setUnsubscribing(false);
      });
  }, [onUnsubscribed]);
  return [unsubscribe, { unsubscribing, unsubscribeError }];
};

const createApplicationServerKey = (publicKey: string): Uint8Array =>
  Uint8Array.from(atob(publicKey), element => {
    const value = element.codePointAt(0);
    invariant(typeof value === "number");
    return value;
  });

const fetchPublicKey = (friendToken?: string): Promise<string> => {
  const query = friendToken ? { friend_token: friendToken } : {};
  return fetchRoute<{ publicKey: string }>(routes.pushSubscriptions.publicKey, {
    descriptor: "load web push public key",
    params: { query },
  }).then(({ publicKey }) => publicKey);
};
