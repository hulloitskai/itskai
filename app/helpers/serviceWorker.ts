import serviceWorkerUrl from "~/workers/service-worker.ts?worker&url";

export const getServiceWorkerRegistration =
  (): Promise<ServiceWorkerRegistration> =>
    navigator.serviceWorker
      .getRegistration(serviceWorkerUrl)
      .then(registration => {
        if (!registration) {
          console.warn("No service worker registration found; registering...");
          return registerServiceWorker();
        }
        return registration;
      });

export const registerServiceWorker = (): Promise<ServiceWorkerRegistration> =>
  navigator.serviceWorker
    .register(serviceWorkerUrl, {
      type: "module",
    })
    .then(registration => {
      navigator.serviceWorker.addEventListener("message", event => {
        console.log("Received message from service worker", event);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { action, url } = event.data;
        if (!action) {
          return;
        }
        switch (action) {
          case "navigate":
            if (typeof url === "string") {
              router.visit(url);
            }
            break;
          default:
            throw new Error(`Unknown action: ${action}`);
        }
      });
      return registration;
    });
