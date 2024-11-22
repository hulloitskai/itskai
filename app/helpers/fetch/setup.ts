import {
  type FetchOptions,
  type HeaderOptions,
  type ResponseError,
} from "@js-from-routes/client";
import { Config } from "@js-from-routes/client";
import { identity } from "lodash-es";

export const setupFetch = (): void => {
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
    const requestInit: RequestInit = {
      body,
      credentials: "include",
      redirect: "follow",
      ...options,
    };
    return fetch(url, requestInit)
      .then(async response => {
        if (response.status >= 200 && response.status < 300) return response;
        const error = await Config.unwrapResponseError(response, responseAs);
        throw error;
      })
      .catch((error: ResponseError) => Config.onResponseError(error));
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
