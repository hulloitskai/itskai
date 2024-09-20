import { type Method } from "@inertiajs/core";
import {
  type PathHelper,
  request,
  type RequestOptions,
  type ResponseError,
} from "@js-from-routes/client";

export { setupFetch } from "./setup";

export type FetchRouteOptions = Partial<
  Omit<RequestOptions, "method" | "fetch">
> & {
  method?: Method;
  failSilently?: boolean;
  descriptor: string;
};

export const fetchRoute = async <Data>(
  route: PathHelper | string,
  options: FetchRouteOptions,
): Promise<Data> => {
  const { failSilently, ...otherOptions } = options;
  const handleError = (responseError: ResponseError) => {
    const { error } = responseError.body as { error: string };
    console.error(`Failed to ${options.descriptor}`, error);
    if (!failSilently) {
      showNotice({
        title: `Failed to ${options.descriptor}`,
        message:
          typeof error === "string" ? error : "An unexpected error occurred.",
      });
    }
    throw new Error(error);
  };
  if (typeof route === "string") {
    const { method, ...otherOptions } = options;
    const requestOptions = omit(otherOptions, "params");
    return request(method ?? "get", route, requestOptions).catch(handleError);
  }
  return route<Data>(otherOptions).catch(handleError);
};
