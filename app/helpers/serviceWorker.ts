import serviceWorkerUrl from "~/workers/service-worker.ts?worker&url";

export const getOrRegisterServiceWorker =
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

const handleServiceWorkerMessage = (event: MessageEvent<any>): void => {
  console.info("Received message from service worker", event);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { action } = event.data;
  if (!action) {
    return;
  }
  switch (action) {
    case "navigate": {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url } = event.data;
      if (typeof url === "string" && url !== location.href) {
        router.visit(url);
      }
      break;
    }
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

export const registerServiceWorker = (): Promise<ServiceWorkerRegistration> =>
  navigator.serviceWorker
    .register(serviceWorkerUrl, {
      type: "module",
    })
    .then(registration => {
      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage,
      );
      return registration;
    });
