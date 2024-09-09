export { setupFetch } from "./setup";

import type {
  RequestOptions,
  PathHelper,
  ResponseError,
} from "@js-from-routes/client";
import type { Method } from "@inertiajs/core";

import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";

export interface FetchResult<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type FetchParams = {
  query?: Record<string, any>;
  [key: string]: any;
};

export type FetchOptions = Partial<Omit<RequestOptions, "method" | "fetch">> &
  SWRConfiguration & {
    method?: Method;
    skip?: boolean;
    failSilently?: boolean;
    descriptor: string;
  };

export const useFetch = <Data extends Record<string, any> & { error?: never }>(
  route: PathHelper,
  {
    method,
    skip,
    failSilently,
    descriptor,
    params,
    data,
    deserializeData,
    fetchOptions,
    serializeData,
    responseAs,
    headers,
    ...swrConfiguration
  }: FetchOptions,
): FetchResult<Data> => {
  const key = useMemo(
    () => (skip ? null : route.path(params)),
    [skip, params, route],
  );
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (): Promise<Data> =>
      fetch(route, {
        failSilently,
        descriptor,
        params,
        data,
        deserializeData,
        fetchOptions,
        method,
        serializeData,
        responseAs,
        headers,
      }),
    swrConfiguration,
  );
  return { fetching: isLoading, validating: isValidating, ...swr };
};

export const fetch = async <Data>(
  route: PathHelper,
  options: Omit<FetchOptions, "skip">,
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
