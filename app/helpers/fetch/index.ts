import { type Method } from "@inertiajs/core";
import {
  type PathHelper,
  type RequestOptions,
  type ResponseError,
} from "@js-from-routes/client";

export { setupFetch } from "./setup";

export type FetchRouteOptions = Partial<
  Omit<RequestOptions, "method" | "fetch">
> & {
  method?: Method;
  skip?: boolean;
  failSilently?: boolean;
  descriptor: string;
};

export const fetchRoute = async <Data>(
  route: PathHelper,
  options: Omit<FetchRouteOptions, "skip">,
): Promise<Data> => {
  const { failSilently, ...otherOptions } = options;
  return route<Data>(otherOptions).catch((responseError: ResponseError) => {
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
  });
};
