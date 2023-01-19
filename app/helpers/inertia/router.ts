import { router } from "@inertiajs/react";
import type {
  GlobalEvent,
  GlobalEventNames,
  GlobalEventResult,
  VisitOptions,
} from "@inertiajs/core";

import { useCSRFToken } from "~/helpers/csrf";

export type RouterOptions = {
  readonly csrfToken: string;
};

export class Router {
  csrfToken: string;

  constructor({ csrfToken }: RouterOptions) {
    this.csrfToken = csrfToken;
  }

  visit(url: string | URL, options?: VisitOptions): void {
    router.visit(url, options);
  }

  post(
    url: URL | string,
    data?: any,
    options?: Exclude<VisitOptions, "method" | "data">,
  ): void {
    router.post(url, data, this.optionsWithCSRFToken(options));
  }

  put(
    url: URL | string,
    data?: any,
    options?: Exclude<VisitOptions, "method" | "data">,
  ): void {
    router.put(url, data, this.optionsWithCSRFToken(options));
  }

  patch(
    url: URL | string,
    data?: any,
    options?: Exclude<VisitOptions, "method" | "data">,
  ): void {
    router.patch(url, data, this.optionsWithCSRFToken(options));
  }

  delete(url: URL | string, options?: Exclude<VisitOptions, "method">): void {
    router.delete(url, this.optionsWithCSRFToken(options));
  }

  reload(
    options?: Exclude<VisitOptions, "preserveScroll" | "preserveState">,
  ): void {
    router.reload(this.optionsWithCSRFToken(options));
  }

  on<TEventName extends GlobalEventNames>(
    type: TEventName,
    callback: (event: GlobalEvent<TEventName>) => GlobalEventResult<TEventName>,
  ): VoidFunction {
    return router.on(type, callback);
  }

  private optionsWithCSRFToken(options?: VisitOptions): VisitOptions {
    const { headers: otherHeaders, ...otherOptions } = options || {};
    return {
      headers: {
        "X-CSRF-Token": this.csrfToken,
        ...otherHeaders,
      },
      ...otherOptions,
    };
  }
}

export const useRouter = (): Router => {
  const csrfToken = useCSRFToken();
  return new Router({ csrfToken });
};
