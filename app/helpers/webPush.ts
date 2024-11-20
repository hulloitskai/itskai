import { createContext, useContext } from "react";

import { type PushSubscriptionRegistration } from "~/types";

import { type FetchRouteResponse } from "./fetch";
import { getServiceWorkerRegistration } from "./serviceWorker";

const getPushManager = (): Promise<PushManager> =>
  getServiceWorkerRegistration().then(({ pushManager }) => pushManager);

export const getPushSubscription = (): Promise<PushSubscription | null> =>
  getPushManager().then(pushManager => pushManager.getSubscription());

export interface UseWebPushResult {
  supported: boolean | undefined;
  subscription: PushSubscription | undefined | null;
  registration: PushSubscriptionRegistration | undefined | null;
  subscribed: boolean;
  subscribe: () => Promise<void>;
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
  return {
    registration: subscription === null ? null : data?.registration,
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
  const subscribe = useCallback((): Promise<void> => {
    const registerAndSubscribe = (): Promise<void> =>
      Promise.all<[Promise<PushManager>, Promise<string>]>([
        getPushManager(),
        fetchPublicKey(),
      ])
        .then(([pushManager, publicKey]) =>
          pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: createApplicationServerKey(publicKey),
          }),
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
              throw new Error("Missing auth key");
            }
            if (!keys?.p256dh) {
              throw new Error("Missing p256dh key");
            }
            return fetchRoute(routes.pushSubscriptions.create, {
              descriptor: "subscribe to push notifications",
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
        }
      });
    }
  }, [onSubscribed]);
  return [subscribe, { subscribing, subscribeError }];
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

const fetchPublicKey = (): Promise<string> =>
  fetchRoute<{ public_key: string }>(routes.pushSubscriptions.publicKey, {
    descriptor: "load web push public key",
  }).then(({ public_key }) => public_key);
