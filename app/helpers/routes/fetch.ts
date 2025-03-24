import {
  type Method,
  type PathHelper,
  request,
  type RequestOptions,
  type ResponseError,
} from "@js-from-routes/client";
import { omit } from "lodash-es";
import { toast } from "sonner";

export type FetchRouteOptions = Partial<
  Omit<RequestOptions, "method" | "fetch">
> & {
  descriptor: string;
  method?: Method;
  failSilently?: boolean;
};

export const fetchRoute = async <Data>(
  route: PathHelper | string,
  options: FetchRouteOptions,
): Promise<Data> => {
  const { descriptor, failSilently, ...routeOptions } = options;
  const handleError = (responseError: ResponseError) => {
    const { body } = responseError; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    if (body !== null && typeof body === "object" && "error" in body) {
      const { error } = body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      console.error(`failed to ${descriptor}`, error);
      if (!failSilently) {
        toast.error(`failed to ${descriptor}`, {
          description:
            typeof error === "string" ? error : "an unknown error occurred.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(error);
    } else {
      console.error(`failed to ${descriptor}`, responseError);
      if (!failSilently) {
        toast.error(`failed to ${descriptor}`, {
          description: responseError.message,
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
