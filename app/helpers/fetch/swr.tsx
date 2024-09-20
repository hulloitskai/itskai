import { type PathHelper } from "@js-from-routes/client";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

import { fetchRoute, type FetchRouteOptions } from ".";

export interface FetchSWRResult<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type FetchSWROptions = FetchRouteOptions & SWRConfiguration;

export interface FetchSWRParams {
  query?: Record<string, any>;
  [key: string]: any;
}

export const useFetchSWR = <
  Data extends Record<string, any> & { error?: never },
>(
  route: PathHelper,
  {
    method,
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
  }: FetchSWROptions,
): FetchSWRResult<Data> => {
  const { isPaused } = swrConfiguration;
  const key = useMemo(
    () => (isPaused?.() ? null : route.path(params)),
    [isPaused, JSON.stringify(params)], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (route: string): Promise<Data> =>
      fetchRoute(route, {
        failSilently,
        descriptor,
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
