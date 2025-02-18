import {
  type Errors,
  type Method,
  type Page,
  type VisitOptions,
} from "@inertiajs/core";
import { type PathHelper } from "@js-from-routes/client";

import { sentencify } from "~/helpers/inflect";

export type { EmailComponent } from "./email";
export type { PageComponent } from "./page";
export { PageType, parsePageImports, resolvePageType } from "./page";
export { setupInertia } from "./setup";

export interface VisitRouteOptions extends VisitOptions {
  descriptor: string;
  params?: {
    query?: Record<string, any>;
    [key: string]: any;
  };
  failSilently?: boolean;
  onFailure?: (error: Error) => void;
}

export const visitRoute = (
  route: PathHelper | string,
  options: VisitRouteOptions,
): Promise<Page | Errors | void> => {
  const removeInvalidListenerRef = { current: () => {} };
  const {
    descriptor,
    failSilently,
    params,
    onBefore,
    onFinish,
    onSuccess,
    onCancel,
    onError,
    onFailure,
    ...otherOptions
  } = options;
  const path = typeof route === "string" ? route : route.path(params);
  return new Promise((resolve, reject) => {
    const visitOptions: Partial<VisitOptions> = {
      preserveScroll: true,
      preserveState: true,
      onBefore: visit => {
        removeInvalidListenerRef.current = router.on(
          "invalid",
          (event): void => {
            const { response } = event.detail;
            if (response.status >= 400 && response.data instanceof Object) {
              const data = response.data as Record<string, any>;
              if (typeof data.error === "string") {
                event.preventDefault();
                const error = new Error(data.error);
                console.error(`Failed to ${descriptor}`, error);
                if (!failSilently) {
                  toast.error(`Failed to ${descriptor}`, {
                    description: sentencify(
                      data.error || "An unknown error occurred",
                    ),
                  });
                }
                onFailure?.(error);
                reject(error);
                return;
              }
            }
            console.error("Unknown error response", response);
            if (!failSilently) {
              toast.error(`Failed to ${descriptor}`, {
                description: "An unknown error occurred",
              });
            }
            reject(new Error("An unknown error occurred"));
          },
        );
        onBefore?.(visit);
      },
      onFinish: visit => {
        removeInvalidListenerRef.current();
        onFinish?.(visit);
      },
      onSuccess: page => {
        resolve(page);
        onSuccess?.(page);
      },
      onCancel: () => {
        resolve();
        onCancel?.();
      },
      onError: errors => {
        console.warn(`Couldn't ${descriptor}`, errors);
        resolve(errors);
        onError?.(errors);
      },
      ...otherOptions,
    };
    if (!visitOptions.method && typeof route !== "string") {
      const method = route.httpMethod.toLowerCase();
      if (["get", "put", "post", "patch", "delete"].includes(method)) {
        visitOptions.method = method as Method;
      }
    }
    startTransition(() => {
      router.visit(path, visitOptions);
    });
  });
};
