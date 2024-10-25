import {
  type Method,
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
  const { failSilently, ...routeOptions } = options;
  const handleError = (responseError: ResponseError) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = responseError;
    if (body !== null && typeof body === "object" && "error" in body) {
      const { error } = body as { error: string };
      console.error(`Failed to ${options.descriptor}`, error);
      if (!failSilently) {
        toast.error(`Failed to ${options.descriptor}`, {
          description:
            typeof error === "string" ? error : "An unknown error occurred.",
        });
      }
      throw new Error(error);
    } else {
      console.error(`Failed to ${options.descriptor}`, responseError);
      if (!failSilently) {
        toast.error(`Failed to ${options.descriptor}`, {
          description: "An unknown error occurred.",
        });
      }
      throw responseError;
    }
  };
  if (typeof route === "string") {
    const { method, ...requestOptions } = omit(routeOptions, "params");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request(method ?? "get", route, requestOptions).catch(handleError);
  }
  return route<Data>(routeOptions).catch(handleError);
};
