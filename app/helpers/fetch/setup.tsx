import { type FetchOptions, type HeaderOptions } from "@js-from-routes/client";
import { Config } from "@js-from-routes/client";

export const setupFetch = (): void => {
  Config.fetch = (args: FetchOptions): Promise<Response> => {
    const { data, responseAs, url, ...options } = args;
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
        throw await Config.unwrapResponseError(response, responseAs);
      })
      .catch(Config.onResponseError);
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
