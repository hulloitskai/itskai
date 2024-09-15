import { type Method } from "@inertiajs/core";
import {
  type PathHelper,
  type RequestOptions,
  type ResponseError,
} from "@js-from-routes/client";
import { type SWRConfiguration, type SWRResponse } from "swr";
import useSWR from "swr";

export { setupFetch } from "./setup";

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
    data,
    descriptor,
    deserializeData,
    failSilently,
    fetchOptions,
    headers,
    method,
    params,
    responseAs,
    serializeData,
    skip,
    ...swrConfiguration
  }: FetchOptions,
): FetchResult<Data> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const key = useMemo(() => (skip ? null : route.path(params)), [skip]);
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
