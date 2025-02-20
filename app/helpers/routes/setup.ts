import { type FetchOptions, type HeaderOptions } from "@js-from-routes/client";
import { Config } from "@js-from-routes/client";
import { identity } from "lodash-es";

export const setupRoutes = (): void => {
  Config.getCSRFToken = (): string | undefined => {
    if (typeof document !== "undefined") {
      const el = document.querySelector<HTMLMetaElement>(
        "meta[name=csrf-token]",
      );
      return el?.content;
    }
  };
  Config.fetch = (args: FetchOptions): Promise<Response> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { url, data, responseAs, ...options } = args;
    let body: BodyInit | undefined;
    if (data !== undefined) {
      if (data instanceof FormData) {
        body = data;
      } else {
        body = JSON.stringify(data);
      }
    }
    return fetch(url, {
      body,
      credentials: "include",
      redirect: "follow",
      ...options,
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        return new Promise<never>((resolve, reject) => {
          Config.unwrapResponseError(response, responseAs).then(reject, reject);
        });
      })
      .catch((error: Error) => Config.onResponseError(error));
  };
  Config.headers = (requestInfo: HeaderOptions): any => {
    const csrfToken = Config.getCSRFToken();
    const headers: Record<string, string> = {
      Accept: "application/json",
      ...(!!csrfToken && { "X-CSRF-Token": csrfToken }),
    };
    if (!(requestInfo.options.data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  };
  Config.deserializeData = identity;
  Config.serializeData = identity;
};
