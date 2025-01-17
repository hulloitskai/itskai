import { pick } from "lodash-es";
import invariant from "tiny-invariant";

import logoSrc from "~/assets/images/logo.png";
import { setupFetch } from "~/helpers/fetch/setup";
import routes from "~/helpers/routes";
import { type PushNotification } from "~/types";

declare const self: ServiceWorkerGlobalScope;

interface NotificationData {
  notification?: PushNotification;
  message?: PushMessage;
  badge?: { count: number };
}

interface PushMessage {
  title: string;
  body?: string;
}

// == Setup
setupFetch();

// == Helpers
const markAsDelivered = (notification: PushNotification): Promise<void> =>
  routes.notifications
    .delivered<{}>({
      params: { id: notification.id },
      data: { notification: pick(notification, "delivery_token") },
    })
    .then(() => {
      console.info(`Marked notification '${notification.id}' as delivered`);
    })
    .catch(error => {
      console.error(
        `Failed to mark notification '${notification.id}' as delivered`,
        error,
      );
    });

// == Claim clients
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// == Push handlers
self.addEventListener("push", event => {
  invariant(event.data, "Missing push data");
  const data = event.data.json() as NotificationData;
  if (import.meta.env.RAILS_ENV === "development") {
    console.debug("Push event", data);
  }
  const { notification, message, badge } = data;
  const actions: Promise<void>[] = [];
  // Set app badge if no window is currently visible.
  if (badge && navigator.setAppBadge) {
    actions.push(
      self.clients.matchAll({ type: "window" }).then(clients => {
        if (!clients.some(client => client.visibilityState === "visible")) {
          return navigator.setAppBadge(badge.count);
        }
        return Promise.resolve();
      }),
    );
  }
  if (message) {
    actions.push(
      self.registration.showNotification(message.title, {
        body: message.body,
        icon: logoSrc,
        data,
        badge: logoSrc,
      }),
    );
  }
  if (notification) {
    actions.push(
      self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: notification.icon_src ?? logoSrc,
        data,
        badge: logoSrc,
      }),
    );
    actions.push(markAsDelivered(notification));
  }
  event.waitUntil(Promise.all(actions));
});

self.addEventListener("pushsubscriptionchange", event => {
  const changeEvent = event as PushSubscriptionChangeEvent;
  const { newSubscription, oldSubscription } = changeEvent;
  const newSubscriptionJSON = newSubscription?.toJSON();
  changeEvent.waitUntil(
    routes.pushSubscriptions.change({
      data: {
        old_subscription: oldSubscription
          ? { endpoint: oldSubscription.endpoint }
          : null,
        new_subscription: newSubscriptionJSON
          ? {
              endpoint: newSubscriptionJSON.endpoint,
              p256dh_key: newSubscriptionJSON.keys?.p256dh,
              auth_key: newSubscriptionJSON.keys?.auth,
            }
          : null,
      },
    }),
  );
});

self.addEventListener("notificationclick", event => {
  console.debug("Notification clicked", event);
  event.notification.close(); // Android needs explicit close
  const { notification } = event.notification.data as NotificationData;
  if (!notification) {
    return;
  }
  const actionUrl =
    notification.action_url ?? routes.adminNotifications.index.path();
  const url = new URL(actionUrl, self.location.href).toString();
  event.waitUntil(
    // Open the target URL
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(clients => {
        // Check if there is already a window/tab open with the target path
        for (const client of clients) {
          if (pathname(client.url) !== pathname(url)) {
            continue;
          }
          // If so, focus it and go to the target URL
          return client.focus().then(client => {
            if (client.url !== url) {
              // NOTE: This doesn't seem to work?
              //
              // See: https://stackoverflow.com/questions/68949151/how-to-solve-service-worker-navigate-this-service-worker-is-not-the-clients-ac
              // return client.navigate(url);

              // So instead, use postMessage to trigger client-side navigation
              client.postMessage({ action: "navigate", url });
            }
            return client;
          });
        }
        // If not, then open the target URL in a new window/tab.
        return self.clients.openWindow(url);
      }),
  );
});

const pathname = (url: string): string => {
  const u = new URL(url, self.location.href);
  return u.pathname;
};

console.info("Service worker installed");

export {};
