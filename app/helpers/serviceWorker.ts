import serviceWorkerUrl from "~/workers/service-worker.ts?worker&url";

export const getOrRegisterServiceWorker =
  (): Promise<ServiceWorkerRegistration> =>
    navigator.serviceWorker
      .getRegistration(serviceWorkerUrl)
      .then(registration => {
        if (!registration) {
          return navigator.serviceWorker.register(serviceWorkerUrl, {
            type: "module",
          });
        }
        return registration;
      });

export const handleServiceWorkerNavigation = (): void => {
  const handleMessage = (event: MessageEvent<any>): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { action } = event.data;
    if (!action) {
      return;
    }
    if (action === "navigate") {
      console.info(
        "Received navigation request from service worker",
        event.data,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url } = event.data;
      if (typeof url === "string" && url !== location.href) {
        router.visit(url);
      }
    }
  };
  navigator.serviceWorker.addEventListener("message", handleMessage);
};

export const registerAndUpdateServiceWorker =
  (): Promise<ServiceWorkerRegistration> =>
    navigator.serviceWorker
      .register(serviceWorkerUrl, { type: "module" })
      .then(registration => registration.update().then(() => registration));
